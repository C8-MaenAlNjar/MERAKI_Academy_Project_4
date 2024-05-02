import React, { useState, useContext, useEffect } from "react";
import { format } from "timeago.js";
import "./singlePost.css";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";

const SinglePostPage = ({ post, onClose }) => {
  const { currentUser } = useContext(AuthContext);
  const [like, setLike] = useState(post.data.Likes);
  const [liked, setLiked] = useState(
    post.data.Likes.some((like) => like.userId === currentUser.id)
  );
  const [comments, setComments] = useState(post.data.comments);
  const handleClose = () => {
    onClose();
  };
  const Likes = async () => {
    try {
      const res = await apiRequest.get(`/like/${post.data.id}`);
      console.log(res.data);
      setLike(res.data);
    } catch (error) {
      console.error("Error fetching likes:", error);
    }
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const description = formData.get("description");
    try {
      const res = await apiRequest.post(`comment/${post.data.id}`, {
        description,
      });
      setComments(...comments, res);
      e.target.reset();
    } catch (err) {
      console.log(err);
    }
  };
  const handleLike = async () => {
    setLiked((prev) => !prev);
    try {
      if (like.some((like) => like.userId === currentUser.id)) {
        await apiRequest.delete(`like/${post.data.id}`);
      } else {
        await apiRequest.post(`like/addlike/${post.data.id}`);
      }
      Likes();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="postArea">
      <div className="close" onClick={handleClose}>
        X
      </div>

      <div className="fullCardContainer">
        <div className="postCard">
          <div className="useData">
            <img
              src={
                post.data.user.avatar ? post.data.user.avatar : "/noavatar.jpg"
              }
              alt=";"
            />
            <h1>{post.data.user.username}</h1>
          </div>
          <div className="likes">
            <button
              className={liked ? "mylike" : "notliked"}
              onClick={handleLike}
            >
              ❤ {like?.length}
            </button>
          </div>
          <div className="postData">
            <div className="description">
              <p>{post.data.description}</p>
              <p>{format(post.data.createdAt)}</p>
            </div>
            <div className="images">
              {post?.data.images?.map((img, index) => (
                <img src={img} alt={index.toString()} key={index} />
              ))}
            </div>
          </div>
          <div className="commiteContainer">
            <div className="commitInput">
              <form onSubmit={handleSumbit}>
                <div className="item">
                  <label></label>
                  <input
                    id="description"
                    name="description"
                    type="text"
                    placeholder="add comment"
                  />
                </div>
                <button className="sendButton">Add</button>
              </form>
            </div>
            <div className="commits">
              {comments.map((comment) => (
                <div className="commentSection" key={comment.id}>
                  <div className="userdata">
                    <img
                      src={
                        comment.user.avatar
                          ? comment.user.username
                          : "/noavatar.jpg"
                      }
                      alt=" "
                    />
                    <p>{comment.user.username}</p>
                  </div>
                  <h1>{comment.description}</h1>
                  <p>{format(comment.createdAt)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
