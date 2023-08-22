import React, { useState ,useContext} from "react";
import axios from "axios";
import{ UserContext } from '../../App'
import './style.css'



const AddPost = () => {
  const userContext = useContext(UserContext)
  const [post, setPost] = useState({
    Image: "",
    description: "",
   
  });

  const handleChange = async (e) => {
    e.preventDefault();

    const token =localStorage.getItem('token')

    try {
      console.log(UserContext.token);
      const response = await axios.post(
        'http://localhost:5000/addpost',
        post,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      console.log("Response:", response.data);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="add-post-container">
      <form className="add-post-form" onSubmit={handleChange}>
        <input
          type="text"
          name="Image"
          placeholder="Image URL"
          value={post.Image}
          onChange={(e) =>
            setPost((prevPost) => ({ ...prevPost, Image: e.target.value }))
          }
        />
        <textarea
          name="description"
          placeholder="Description"
          value={post.description}
          onChange={(e) =>
            setPost((prevPost) => ({ ...prevPost, description: e.target.value }))
          }
        />
       
        
        <button type="submit">Create New Post</button>
      </form>
    </div>
  );
};

export default AddPost;
