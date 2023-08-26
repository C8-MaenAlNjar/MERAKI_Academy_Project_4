import React, { useContext } from "react";
import { useNavigate, useLocation ,Link } from "react-router-dom";
import { UserContext } from "../../App";
import './style.css'

const NavBar = ({ isLog, logout }) => {
  const navigate = useNavigate();
  const  user  = useContext(UserContext);
  const  userinfo  = useContext(UserContext);
  const location = useLocation();
  const token = localStorage.getItem("token");
  

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
    
    
   
    
    
    {token && (
        <>
        <Link to='/addpost'>Add Post</Link>
        <Link to='/dashboard'>Dashboard</Link>
        <Link to='/ProfilePage'>profile</Link>
       
         <button onClick={handleLogout}>Logout</button>
         
                 </>
     
    )}
  </nav>

  );
};

export default NavBar;
