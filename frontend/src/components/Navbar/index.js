import React, { useContext } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./style.css";
import { Image } from '@chakra-ui/react';
import { faUser, faSearch, faHouse } from "@fortawesome/free-solid-svg-icons";
import {
  AppBar,
  Toolbar,
  Typography,
  Link as MuiLink,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactSwitch from "react-switch";





const NavBar = ({ isLog, logout }) => {

  const navigate = useNavigate();
  const user = useContext(UserContext);
  const userInfo = useContext(UserContext);
  const location = useLocation();
  const token = localStorage.getItem("token");


  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    
    <header> 
      
       <div className="topbarLeft">
      <Image src="https://res.cloudinary.com/dmhvb05w3/image/upload/v1693552150/p4/ft8n1w4ixpgrobfv2xag.png"
      alt="Elmor Book"
       className="logo"
      
       objectFit='cover'
       />
      </div>
      {token && (
        <>
          <div className="topbarCenter">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search..."
                className="searchInput"
              />
              <button className="searchIcon">
                <FontAwesomeIcon icon={faSearch} className="icon" />
              </button>
            </div>
          </div>
          <div className="topbarRight">
            <Link to="/ProfilePage">
              <FontAwesomeIcon icon={faUser} className="icon"/>
            </Link>
         
            <Link to="/dashboard">
              <FontAwesomeIcon icon={faHouse} className="icon"/>
            </Link>
            <button onClick={handleLogout}  className="logoutbutton">Logout</button>
          </div>
        </>
      )}

     
    
     
    </header>

  );
};

export default NavBar;
