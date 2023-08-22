import React, { useContext } from "react";
import { useNavigate, useLocation ,Link } from "react-router-dom";
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
    
    
   
    
    
    {user && location.pathname === "/dashboard" && (
        <>
        <Link to='/addpost'>Add Post</Link>
        <Link to='/dashboard'>Dashboard</Link>
         <button onClick={handleLogout}>Logout</button>
         
                 </>
     
    )}
  </nav>

  );
};

export default NavBar;
