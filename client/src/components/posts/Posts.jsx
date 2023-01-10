import { Link } from "react-router-dom";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((data, index) => (
        <div key={index} className="post">
        {data.photo && <img className="postImg" src={data.photo} alt="" />}
        <div className="postInfo">
          <div className="postCats">
            {data.categories.map((data) => (
              <span datalassName="postCat">{data.name}</span>
            ))}
          </div>
          <Link to={`/post/${data._id}`} className="link">
            <span className="postTitle">{data.title}</span>
          </Link>
          <hr />
          <span className="postDate">
            {new Date(data.createdAt).toDateString()}
          </span>
        </div>
        <p className="postDesc">{data.desc}</p>
      </div>
      ))}
    </div>
  );
}
