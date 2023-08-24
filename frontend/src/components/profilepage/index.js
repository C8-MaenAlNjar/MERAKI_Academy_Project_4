import React, { useContext, useEffect, useState } from "react";

import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./style.css";

const ProfilePage = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
        const storedUserInfo = localStorage.getItem("userInfo");
        console.log("profile userInfo :", storedUserInfo);
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
          
        }
        
    }
  }, [navigate, setUserInfo]);

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <div className="cover-photo"></div>
      <div className="main-section">
        <img src={userInfo.image} alt={""} className="profile-picture" />
        <h1>{userInfo.name}</h1>
        <p>@{userInfo.username}</p>
      </div>
    </div>
  );
};
export default ProfilePage;
