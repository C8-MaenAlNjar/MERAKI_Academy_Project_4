import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardHeader,
  Heading,
  Image,
  SimpleGrid,
  CardBody,
  CardFooter,
  Button,
  Stack,
  ButtonGroup,
  Text,
  Divider,
} from "@chakra-ui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus ,faUserPen} from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import axios from "axios";

const ProfilePage = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const [friendList, setFrinedList] = useState([]);
  const [post, setPost] = useState([]);

  useEffect(() => {
    
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } 
    const callUserData = async () => {
      try {
      
        const friendResponse = await axios.get(
          `http://localhost:5000/FriendsList/${userInfo.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFrinedList(friendResponse.data);

      
        const postResponse = await axios.get(
          `http://localhost:5000/getPost/${userInfo.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPost(postResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userInfo.userId) {
      callUserData(); 
    }
  }, [navigate, userInfo]);

  const handleRemoveFriend = async (friendId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:5000/removefriend/${friendId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            userId: userInfo.userId,
          },
        }
      );

      if (response.data.message === "Friend removed successfully") {
        console.log("Friend removed successfully");
        setFrinedList((prevFriendList) =>
        prevFriendList.filter((friend) => friend._id !== friendId)
      );
      } else {
        console.log("Error removing friend:", response.data.message);
      }
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };
  return (
    <div className="profilepage">
      <div className="first">
        <div className="coverphoto">
          <img
            src="https://res.cloudinary.com/dmhvb05w3/image/upload/v1693389514/p4/kun9ixhvkry0eoxfke0m.jpg"
            alt="Cover Photo"
            className="cover-image"
          />
        </div>
        <div className="profilepicture">
          <img src={userInfo.image} alt={""} className="profile-picture" />

          <div className="namebutton">
          <Link to="/Edite">
          <FontAwesomeIcon icon={faUserPen} /></Link>
            <h1>{userInfo.name}</h1>
            <p>@{userInfo.username}</p>
          </div>
          <div className="fakedata">
            <Button variant="ghost" colorScheme="blue">
              Follower
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Following
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Post
            </Button>
          </div>
        </div>
      </div>
      <div className="secando">
        <div className="about-box">
          <h2>Personal Information</h2>
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Location:</strong> New York, USA
          </p>
          <p>
            <strong>Birthday:</strong> January 15, 1990
          </p>
        </div>
        <div className="about-box">
          <h2>Interests</h2>
          <p>
            <strong>Hobbies:</strong> Reading, Cooking
          </p>
          <p>
            <strong>Favorite Movies:</strong> Inception, The Matrix
          </p>
        </div>
      </div>
      <div className="thard">
        <div className="friend-list">
          {friendList && (
            <div className="friend-container">
              {friendList.map((friend) => (
                <Card key={friend._id} maxW="sm">
                  <CardBody>
                    <Image
                      src={friend.image}
                      alt="Green double couch with wooden legs"
                      borderRadius="full"
                      boxSize="150px"
                    />
                    <Stack mt="6" spacing="3">
                      <Heading size="md"> {friend.name}</Heading>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button variant="ghost" 
                      colorScheme="blue"
                      onClick={() => handleRemoveFriend(friend._id)}
                      >
                        Remove
                      </Button>
                      <Button variant="ghost" colorScheme="blue">
                        View
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="user-posts">
          {post.map((post) => (
            <Card maxW="md" className="post" key={post._id}>
              <CardHeader>
                <p>{post.description}</p>
                <Image
                  objectFit="cover"
                  src={post.image}
                  alt="Post Image"
                  style={{ marginTop: "15px" }}
                />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
