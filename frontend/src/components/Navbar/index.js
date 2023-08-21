import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import './style.css'

const NavBar = ({ isLog, logout }) => {
  const navigate = useNavigate();
  const  user  = useContext(UserContext);
  const location = useLocation();

console.log('id',user);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
    
    <a href="/">Home</a>
    <a href="/dashboard">Dashboard</a>
    
    
    {user && location.pathname === "/dashboard" && (
      <button onClick={handleLogout}>Logout</button>
    )}
  </nav>

  );
};

export default NavBar;
