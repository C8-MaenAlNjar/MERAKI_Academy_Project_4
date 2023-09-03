import React from "react";
import { Link } from "react-router-dom";

import "./style.css";


const HomePage = () => {
  return (
    <div className="main">
      <div className="covor"></div>
      <div className="loGo">
      
      </div>
      <div className="content">
        <div className="background-image"></div>
        <ul className="Links">
          <li className="link1">
            <Link to="/login" className="custom-button">
              Login
            </Link>
          </li>
          <li className="link1">
            <Link to="/register" className="custom-button">
              Register
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
