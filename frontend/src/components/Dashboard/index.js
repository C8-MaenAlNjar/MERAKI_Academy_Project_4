import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import "./style.css";

const Dashboard = () => {
  const  userInfo  = useContext(UserContext);

  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const callData = async () => {
      try {
        const postsResponse = await axios.get("http://localhost:5000/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const usersResponse = await axios.get("http://localhost:5000/getAllUsers");

        const friendsResponse = await axios.get(
          `http://localhost:5000/FriendsList/${userInfo.user}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPosts(postsResponse.data.posts);
        setAllUsers(usersResponse.data);
        setFriendsList(friendsResponse.data);
      } catch (error) {
        console.error("Error callinf data:", error);
      }
    };

    callData();
  }, [navigate,userInfo]);

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

  
  const handleAddFriend = async (friendId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/addFriend/${userInfo.user}`,
        { friendId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Friend added successfully") {
        console.log("Friend added successfully");
        // You might want to update the friendsList state here if needed
      } else {
        console.log("Error adding friend:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };
  const handleRemoveFriend = async (friendId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(
        `http://localhost:5000/removefriend/${friendId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            userId: userInfo.user, // Send the userId in the request body
          },
        }
      );

      if (response.data.message === 'Friend removed successfully') {
        console.log('Friend removed successfully');
        // Update the friendsList state or take other necessary actions
      } else {
        console.log('Error removing friend:', response.data.message);
      }
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  
  return (
    <div className="dashboard">
      <div className="friend-list">
        <h2>Friend List</h2>
       
      
       
        { friendsList && friendsList.map((friend) => (
          <li key={friend._id} className="friend-item">
            <div className="friend-info">
              <img
                src={friend.image}
                alt={friend.name}
                className="friend-image"
              />
              <div className="friend-details">
                <h3 className="friend-name">{friend.name}</h3>
                <p className="friend-username">{friend.username}</p>
              </div>
            </div>
            <button
              className="remove-friend-button"
              onClick={() => handleRemoveFriend(friend._id)}
            >
              Remove Friend
            </button>
          </li>
        ))}
      </div>
      <div className="center-content">
        {posts.map((post) => (
          <ul className="post" key={post._id}>
            <p className="username">{post.username}</p>
            <p className="post-description">{post.description}</p>
            <li className="comments">
            {userInfo.user !== post.author && ( // Only show the "Add Friend" button for posts by other users
            <button
              className="add-friend"
              onClick={() => handleAddFriend(post.author)}
            >
              Add Friend
            </button>
          )}
              {post.comments.map((comment) => (
                <p key={comment._id} className="comment">
                  {comment.comment}
                </p>
              ))}
            </li>
            <img src={post.image} alt="post" />

            {userInfo.user === post.author && (
              <div className="post-buttons">
                <button
                  className="delete"
                  onClick={() => handleDelete(post._id)}
                >
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
    </div>
  );
};

export default Dashboard;
