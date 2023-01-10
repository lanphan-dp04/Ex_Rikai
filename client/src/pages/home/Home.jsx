import React, { useEffect, useState } from "react";
import Posts from "../../components/posts/Posts";
import { axiosClient } from "../../configAxios";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axiosClient.get("/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);
  return (
    <>
      <div className="home">
        <Posts posts={posts} />
      </div>
    </>
  );
}

export default Home;
