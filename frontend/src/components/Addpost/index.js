import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./style.css";

const AddPost = () => {
 
  const navigate = useNavigate();
  const [post, setPost] = useState({
    Image: '',
    description: "",
  });

  const handleChange = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");



    try {
      const response = await axios.post(
        "http://localhost:5000/addpost",
        post,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

     
      navigate("/dashboard"); 
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="add-post-container">
      <form className="add-post-form" onSubmit={handleChange}>
        <input
          type="file"
          name="image"
          placeholder="Image URL"
          onChange={(e) =>
            setPost({ ...post, Image: e.target.files[0] })
          }
        />
        {post.Image?(
          <img 
          src={URL.createObjectURL(post.Image)}
          alt=""
          className="userImage"/>
        ):( <img 
          src="https://i.redd.it/lgmilv1j2wjb1.jpg"
          alt="didnt work"
          className="userImage"/>)}
        <textarea
          name="description"
          placeholder="Description"
          value={post.description}
          onChange={(e) =>
            setPost({ ...post, description: e.target.value })
          }
        />
        <button type="submit">Create New Post</button>
      </form>
    </div>
  );
};

export default AddPost;
