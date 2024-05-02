import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./style.css";
import { AuthContext } from "../../context/AuthContext";
import { useState, useContext, useEffect } from "react";

const Register = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { currentToken, currentUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const formData = new FormData(e.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    try {
      const response = await axios.post(
        "http://localhost:8800/api/user/register",
        {
          username,
          email,
          password,
        }
      );

      if (response.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      setError("fail to register");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser]);
  return (
    <div className="registerContainer">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create and Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button disabled={isLoading}>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
