import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./navbar.css";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import apiRequest from "../../lib/apiRequest.js";
const NavBar = () => {
  const { currentToken, updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await apiRequest.post("/user/logout");
      updateUser(null);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav>
      <div className="left">
        <img
          src="https://res.cloudinary.com/dmhvb05w3/image/upload/v1693552150/p4/ft8n1w4ixpgrobfv2xag.png"
          alt="Elmor Book"
          className="logo"
        />
      </div>
      {currentUser  && (
        <>
          <div className="right">
            <div className="seacrBar">
              <input
                type="text"
                placeholder="Search..."
                className="searchInput"
              />
              <button className="searchIcon">Q</button>
            </div>
            <div className="Buttons">
              <div className="">
                <Link to="/dashboard/profilePage">Profile</Link>
                <Link to="/dashboard">Home</Link>
              </div>
            </div>
            <div className="logout">
              <button onClick={handleLogout} className="logoutbutton">
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavBar;
