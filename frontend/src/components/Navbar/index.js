import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../App";

const NavBar = ({ isLog, logout }) => {
  const navigate = useNavigate();
  const  user  = useContext(UserContext);
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      {location.pathname === "/dashboard" && (
        <button onClick={handleLogout}>Lougout</button>
      )}
    </nav>
  );
};

export default NavBar;
