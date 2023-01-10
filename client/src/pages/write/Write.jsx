import { useContext, useState } from "react";
import "./write.css";
import { axiosClient } from "../../configAxios";
import { Context } from "../../context/Context";

export default function Write() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        username: user.username,
        title,
        desc,
      };
      if (!title || !desc) {
        alert("Vui long nhap day du");
        return;
      }
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        const photo = await axiosClient.post("/upload", data);
        newPost.photo = photo.data;
      }
      const res = await axiosClient.post("/posts", newPost);
      window.location.replace("/post/" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="write">
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <div className="wrapperImg">
            <label htmlFor="fileInput">
              <i className="writeIcon fas fa-plus"></i>
              <p>Image</p>
            </label>
            {file && (
              <img
                className="writeImg"
                src={URL.createObjectURL(file)}
                alt=""
              />
            )}
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              setTitle(value);
            }}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
