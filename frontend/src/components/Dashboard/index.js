import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./style.css";

const Dashboard = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPost] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!user.user) {
     
      navigate("/login");
      return; 
    }


    const showPost = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setPost(response.data.posts);
      } catch (error) {
        console.log("Eror", error.response.data);
      }
    };
    showPost();
  }, [user]);
  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPost(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.log("Error deleting post", error.response.data);
    }
  };

  const handleEdit = async (postId,updatedData)=>{
    try{
      const token =localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPost((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? { ...post, ...updatedData } : post))
      ); 
    }catch(s){s}
  }
  return (
    <div className="center-content">
      {posts.map((post) => (
        <ul className="post" key={post._id}>
          <p className="username">{post.username}</p>
          <img src={post.image} alt="post" />

          <p className="post-description">{post.description}</p>

          <p>{console.log(user.user === post.author)}</p>
          {user.user === post.author && (
            <div className="post-buttons">
              <button onClick={() => handleDelete(post._id)}>Delete</button>
              <button>Edit</button>
            </div>
          )}
        </ul>
      ))}
    </div>
  );
};

export default Dashboard;
