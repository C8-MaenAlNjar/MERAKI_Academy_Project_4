import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./style.css";

const Dashboard = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [editedPostId, setEditedPostId] = useState(null);
  const [newImage, setNewImage] = useState(null);
  const [newDescription, setNewDescription] = useState("");
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const editedData = JSON.parse(localStorage.getItem("editedData"));
    if (editedData) {
      setEditedPostId(editedData.editedPostId);
      setNewImage(editedData.newImage);
      setNewDescription(editedData.newDescription);
    }
    if (!user.user) {
      navigate("/login");
      return;
    }

    const showPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setPosts(response.data.posts);
      } catch (error) {
        console.log("Error", error.response.data);
      }
    };
    showPosts();
  }, [user]);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.log("Error deleting post", error.response);
    }
  };

  const handleEditClick = (postId) => {
    setEditedPostId(postId);
    setNewImage(null);
    setNewDescription("");
  };

  const handleEdit = async (postId) => {
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("image", newImage);
      formData.append("description", newDescription);
      const response=await axios.put(`http://localhost:5000/updatepost/${postId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
console.log("usus",response);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, image: newImage, description: newDescription }
            : post
        )
      );

      setEditedPostId(null);
      setNewImage(null);
      setNewDescription("");
    } catch (error) {
      console.log("Error", error.response);
    }
  };

  const handleAddComment = async (postId) => {
    try {
      console.log(postId);
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/comments/${postId}`,
        {
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, response.data.comment] }
            : post
        )
      );

      setNewComment("");
    } catch (error) {
      console.log("Error", error.response);
    }
  };

  return (
    <div className="center-content">
    {posts.map((post) => (
      <ul className="post" key={post._id}>
        <p className="username">{post.username}</p>
        <li className="comments">
          {post.comments.map((comment) => (
            <p key={comment._id} className="comment">
              {comment.comment}
            </p>
          ))}
        </li>
        <img src={post.image} alt="post" />
        {editedPostId === post._id ? (
          <div className="post-buttons">
            <input
              type="file"
              className="file-input" 
              onChange={(e) => setNewImage(e.target.files[0])}
            />
            <textarea
              className="new-description" 
              placeholder="New Description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <button className="save" onClick={() => handleEdit(post._id)}>
              Save
            </button>
          </div>
        ) : (
          <p className="post-description">{post.description}</p>
        )}
        {user.user === post.author && (
          <div className="post-buttons">
            <button
              className="delete" 
              onClick={() => handleDelete(post._id)}
            >
              Delete
            </button>
            <button
              className="edit" 
              onClick={() => handleEditClick(post._id)}
            >
              Edit
            </button>
          </div>
        )}
        
        <li className="add-comment">
          <textarea
            className="comment-input" 
            placeholder="Add a comment"
            value={newComment[post._id]}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            className="add-comment-button"
            onClick={() => handleAddComment(post._id)}
          >
            Add Comment
          </button>
        </li>
      </ul>
    ))}
  </div>
  
  );
};

export default Dashboard;
