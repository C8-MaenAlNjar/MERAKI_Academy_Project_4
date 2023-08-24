import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./style.css";

const Dashboard = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!user.user) {
      navigate("/login");
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.posts);
      } catch (error) {
        console.log("Error fetching posts", error.response.data);
      }
    };

    fetchPosts();
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

  const handleAddComment = async (postId) => {
    try {
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
          <p className="post-description">{post.description}</p>
          {user.user === post.author && (
            <div className="post-buttons">
              <button className="delete" onClick={() => handleDelete(post._id)}>
                Delete
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
