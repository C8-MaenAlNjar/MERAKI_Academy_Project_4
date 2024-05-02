import React, { useState, useContext, useEffect } from "react";
import "./postCard.css";
import { format } from "timeago.js";
import apiRequest from "../../lib/apiRequest.js";
import SinglePostPage from "../singlePost/page.jsx";
import { AuthContext } from "../../context/AuthContext";

const PostCard = ({ posts }) => {
  const [show, setShow] = useState(false);
  const [post, setPost] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const [like, setLike] = useState(null);
  useEffect(() => {
    const getlike = async () => {
      try {
        const likesData = {};
        for (const post of posts) {
          const res = await apiRequest.get(`/like/${post.id}`);
          likesData[post.id] = res.data;
        }
        setLike(likesData);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    getlike();
  }, [like,posts]);

  const SinglePostData = async (postId) => {
    setShow(true);
    try {
      const post = await apiRequest(`/post/${postId}`);
      setPost(post);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCloseSinglePost = () => {
    setShow(false);
    setPost(null);
  };
  return (
    <div className="container">
      <div className="addPost">
        {show && post && (
          <SinglePostPage post={post} onClose={handleCloseSinglePost} />
        )}
      </div>
      <div className="postContainer">
        {posts
          ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <div
              className="card"
              key={post.id}
              onClick={() => SinglePostData(post.id)}
            >
              <div className="useData">
                <img
                  src={post.user.avatar ? post.user.avatar : "/noavatar.jpg"}
                  alt=";"
                />
                <h1>{post.user.username}</h1>
              </div>
              <div className="postData">
                <div className="description">
                  <p>{post.description}</p>
                  <p>{format(post.createdAt)}</p>
                </div>
                <div className="images">
                  {post?.images?.map((img, index) => (
                    <img src={img} alt={index.toString()} key={index} />
                  ))}
                </div>
                <div className="userInter">
                  <div className="comments">
                    <div>
                      {post.comments.map((comment) => (
                        <p key={comment.id}>{comment.description}</p>
                      ))}
                    </div>
                  </div>
                  <div className="likes">
                    <p
                      className={
                        like &&
                        like[post.id]?.some(
                          (obj) => obj?.userId === currentUser?.id
                        )
                          ? "mylike"
                          : "notliked"
                      }
                    >
                      ❤
                    </p>

                    {like && like[post.id] && like[post.id].length}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PostCard;
