import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

import "./main.css";

const HomePage = () => {
  const navigate = useNavigate();

  const { currentToken, currentUser } = useContext(AuthContext);
  useEffect(() => {
    if (currentToken) {
      navigate("/dashboard");
    }
  }, [currentToken]);
  return (
    <div className="main">
      {!currentUser && (
        <div className="loginPage">
          <div className="cover">
            <img src="/cover.jpg" alt="" />
          </div>
          <div className="Buttons">
            <Link to="/login" className="custom-button">
              LOGIN
            </Link>
            <Link to="/register" className="custom-button">
              REGISTER
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
