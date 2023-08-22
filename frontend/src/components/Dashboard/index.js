import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import "./style.css";

const Dashboard = () => {
  const user = useContext(UserContext);
  const [posts, setPost] = useState([]);

  useEffect(() => {

    const token =localStorage.getItem('token')
    const showPost = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts", {
          headers: {
            Authorization: `Bearer${token
          }`,
          },
        });

        console.log(response);
        setPost(response.data);
      } catch (error) {
        console.log("Eror", error.response);
      }
    };
    showPost();
  }, []);

  return (
    <div>
    {posts.map((post) => (
      <ul className="post" key={post._id}>
        <h1>{post.image}</h1>
        <p>{post.description}</p>
        {user && user.username === post.author && (
          <>
            <button>Delete</button>
            <button>Edit</button>
          </>
        )}
      </ul>
    ))}
  </div>
  
  );
};

export default Dashboard;
