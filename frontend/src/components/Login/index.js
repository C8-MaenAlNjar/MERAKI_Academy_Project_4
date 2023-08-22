import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../../App";
import './style.css'

const Login = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const handlLogin = async (e) => {
    e.preventDefault();

    

    try {
      const response = await axios.post("http://localhost:5000/login", info);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", response.data.user);
        userContext.setUser(response.data.userId);
        console.log("respon:", response);
       
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="login-form" onSubmit={(e) => handlLogin(e)}>
        <input
          type="email"
          className="login-input"
          placeholder="email"
          value={info.email}
          onChange={(e) => setInfo({ ...info, email: e.target.value })}
        />
        <input
          type="password"
          className="login-input"
          placeholder="password"
          value={info.password}
          onChange={(e) => setInfo({ ...info, password: e.target.value })}
        />
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};
export default Login;
