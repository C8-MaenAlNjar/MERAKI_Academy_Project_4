import axios from "axios";
import React, { useState } from "react";
import { useNavigate} from "react-router-dom";

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
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
         type="text"
         name="username"
         placeholder="username"
         value={userData.username}
         onChange={(e) => setUserData({ ...userData, username: e.target.value })}
        />
         <input
         type="text"
         name="email"
         placeholder="email"
         value={userData.email}
         onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        />
         <input
         type="text"
         name="password"
         placeholder="password"
         value={userData.password}
         onChange={(e) => setUserData({ ...userData, password: e.target.value })}
        />
         <input
         type="text"
         name="name"
         placeholder="name"
         value={userData.name}
         onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register 