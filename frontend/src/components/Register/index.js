import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import axios from "axios";
import "./style.css";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [imageFile, setImageFile] = useState([]);

  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    formData.append("upload_preset", "nsoar6pz");

    const response = await axios.post(
      "https://api.cloudinary.com/v1_1/dmhvb05w3/image/upload",
      formData
    );
    console.log("imae here", file);
    console.log("imae here", response.data.secure_url);
    setImageFile(response.data.secure_url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/register", {
        ...userData,
        image: imageFile,
      });

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="register-container">
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="register-input"
            value={userData.username}
            onChange={handleUserDataChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="register-input"
            value={userData.password}
            onChange={handleUserDataChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="register-input"
            value={userData.email}
            onChange={handleUserDataChange}
          />

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="register-input"
            value={userData.name}
            onChange={handleUserDataChange}
          />

          <input
            type="file"
            name="image"
            className="register-input"
            onChange={handleImageUpload}
          />
          {imageFile && (
            <Image
              cloudName="dmhvb05w3"
              publicId={imageFile.name}
              width="150"
              crop="scale"
            />
          )}

          <button type="submit" className="register-button">
            Register
          </button>
        </form>

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
