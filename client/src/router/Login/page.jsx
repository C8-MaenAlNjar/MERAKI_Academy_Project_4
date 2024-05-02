import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest.js";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser, currentToken, currentUser } = useContext(AuthContext);

  const handlLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const formData = new FormData(e.target);

    const username = formData.get("username");
    const password = formData.get("password");
    try {
      const res = await apiRequest.post("/user/login", {
        username,
        password,
      });

      updateUser(res.data);

      navigate("/dashboard");
    } catch (err) {
      setError("login failed");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(()=>{
    if(currentUser){
      navigate('/dashboard');
    }
    },[currentUser])
  return (
    <div class="loginContainer">
      <div class="formContainer">
        <form onSubmit={handlLogin}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}

          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
