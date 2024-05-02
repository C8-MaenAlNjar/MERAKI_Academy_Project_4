import React, { useContext, useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import UploadWidget from "../../components/uploadWidget/page";
import apiRequest from "../../lib/apiRequest";

const AddPost = () => {
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [image, setImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    try {
      await apiRequest.post("post/addpost", {
        postData: {
          description: inputs.description,
          images: image,
        },
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
      setError(error);
    }
  };

  return (
    <div className="addPostContainer">
      <div className="userData">
        <img
          src={currentUser.avatar ? currentUser.avatar : "/noavatar.jpg"}
          alt="test"
        />
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label htmlFor="description"></label>
            <input id="description" name="description" type="text" />
          </div>
          <button className="sendButton" disabled={isLoading}>
            Add
          </button>
          {error && <span>error</span>}
        </form>
        <div className="imgUpload">
          <UploadWidget
            uwConfig={{
              cloudName: "dmhvb05w3",
              uploadPreset: "nsoar6pz",
              multiple: false,
              maxImageFileSize: 2000000,
              folder: "avatars",
            }}
            setState={setImage}
          />
        </div>
      </div>
    </div>
  );
};

export default AddPost;
