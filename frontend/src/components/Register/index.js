import axios from "axios";
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import './style.css'


const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", userData);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  return(
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="register-input"
          value={userData.username}
          onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          className="register-input"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="register-input"
          value={userData.password}
          onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="register-input"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      <p className="login-link">
        you have an account? <Link to="/login">login</Link>
      </p>
    </div>
  );
};

export default Register 