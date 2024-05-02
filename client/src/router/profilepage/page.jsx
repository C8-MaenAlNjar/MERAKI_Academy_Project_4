import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { useNavigate, useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { format } from "timeago.js";
import PostCard from "../../components/postCard/page.jsx";

import "./style.css";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const data = useLoaderData();
  const currentUserPosts = data.postResponse.data.filter(
    (post) => post.userId === currentUser.id
  );

  console.log(currentUserPosts);
  return (
    <div className="profile">
      <div className="images">
        <img
          src={currentUser.avatar ? currentUser.avatar : "/noavatar.jpg"}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="center">
            <span>{currentUser.username}</span>
            <div className="info">
              <div className="item">
                <span>{currentUser.email}</span>
              </div>
            </div>
            <button>
              
              <Link to="/dashboard/profilePage/profileUpdate">Edite</Link>
            </button>
          </div>
        </div>
        <div className="Posts">
          <PostCard posts={currentUserPosts} />
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
