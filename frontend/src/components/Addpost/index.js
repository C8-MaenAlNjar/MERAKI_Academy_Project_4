import React, { useContext, useState } from "react";
import axios from "axios";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { Image } from "cloudinary-react";
import { Button } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faImage } from "@fortawesome/free-solid-svg-icons";
import { Card, CardFooter } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";




const AddPost = () => {
 
  const userInfo = useContext(UserContext);
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleCreatePost = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!description || !image) {
        console.log("Description or image is missing.");
        return;
      }

      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "nsoar6pz");

      const cloudinaryResponse = await axios.post(
        "https://api.cloudinary.com/v1_1/dmhvb05w3/image/upload",
        formData
      );

      const imageUrl = cloudinaryResponse.data.secure_url;

      const response = await axios.post(
        "http://localhost:5000/addpost",
        {
          description: description,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );


      setDescription("");
      setImage("");
      navigate("/dashboard");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Card className="add-post-container">
      <div>
      <Avatar src={userInfo.userInfo.image}alt="User Avatar"  style={{ marginBottom: '10px' }}/>
      <div className="post-header">
        <Textarea
          className="post-textarea"
          placeholder="What's on your mind?"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      {image && (
        <Image
          cloudName="dmhvb05w3E"
          publicId={image.name}
          className="image-preview"
          alt="Image Preview"
        />
      )}
   <div className="post-footer">
  <div className="image-upload">
   
    <label htmlFor="file-input">
      <IconButton
        as="span"
        fontSize="30px"
        aria-label="Upload Image"
        icon={<FontAwesomeIcon icon={faImage} />}
      />
     
      <input
        type="file"
        id="file-input"
        name="image"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => setImage(e.target.files[0])}
      />
    </label>
  </div>
        <div className="button-group">
          <Button
            className="button-add"
            variant="ghost"
            leftIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={handleCreatePost}
          >
            Post
          </Button>
        </div>
      </div>
      </div>
      
    </Card>
  );
};

export default AddPost;
