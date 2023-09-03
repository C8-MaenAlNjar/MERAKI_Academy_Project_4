import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardHeader,
  CardBody,
  Image,
  CardFooter,
  Button,
  Flex,
  Avatar,
  Heading,
  Text,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { BiLike, BiChat, BiShare } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useDisclosure, Collapse } from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import AddPost from "../Addpost";
import SideBar from "../sideBar";
import PostComments from "../showcommit";
import { useColorMode, toggleColorMode } from "@chakra-ui/react";
import { HStack } from "@chakra-ui/react";

const Dashboard = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  console.log("how", posts);
  const [newComment, setNewComment] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const callData = async () => {
      try {
        const postsResponse = await axios.get(`http://localhost:5000/showposts/${userInfo.userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const usersResponse = await axios.get(
          "http://localhost:5000/getAllUsers"
        );

        const friendsResponse = await axios.get(
          `http://localhost:5000/FriendsList/${userInfo.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPosts(postsResponse.data.posts);
        setAllUsers(usersResponse.data);
        setFriendsList(friendsResponse.data);
      } catch (error) {
        console.error("Error callinf data:", error);
      }
    };

    callData();
  }, [userInfo]);

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/post/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.log("Error deleting post", error.response);
    }
  };

  const handleAddComment = async (postId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/comments/${postId}`,
        {
          comment: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === postId
            ? { ...post, comments: [...post.comments, response.data.comment] }
            : post
        )
      );

      setNewComment((prevComments) => ({
        ...prevComments,
        [postId]: "",
      }));
    } catch (error) {
      console.log("Error", error.response);
    }
  };

  const handleAddFriend = async (friendId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:5000/addFriend/${userInfo.user}`,
        { friendId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.message === "Friend added successfully") {
        console.log("Friend added successfully");
      } else {
        console.log("Error adding friend:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const toggleComments = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dashboard">
      <div>
        <SideBar className="sidbar" />

        <div className="center-content">
          <AddPost />

          <div className="center-content">
            {posts.map((post) => (
              <Card maxW="lg" className="post" key={post._id}>
                <CardHeader>
                  <Flex justify="space-between" spacing="4">
                    {allUsers.map(
                      (user) =>
                        user._id === post.author && (
                          <div key={user._id} className="user-info">
                            <div>
                              <p className="username">{post.username}</p>
                            </div>
                            <Avatar
                              src={user.image}
                              style={{ marginTop: "15px" }}
                            />
                          </div>
                        )
                    )}

                    <IconButton
                      variant="ghost"
                      colorScheme="gray"
                      aria-label="See menu"
                      icon={<BsThreeDotsVertical />}
                    />
                  </Flex>
                </CardHeader>
                <div className="post-image">
                  <p className="post-description">{post.description}</p>
                  <Image
                    objectFit="cover"
                    src={post.image}
                    alt="Post Image"
                    style={{ marginTop: "15px" }}
                  />
                </div>{" "}
                <CardFooter
                  justify="space-between"
                  flexWrap="wrap"
                  sx={{
                    "& > button": {
                      minW: "129px",
                    },
                  }}
                >
                  {userInfo.userId !== post.author && (
                    <Button
                      flex="1"
                      variant="ghost"
                      leftIcon={<FontAwesomeIcon icon={faUserPlus} />}
                      className="add-friend"
                      onClick={() => handleAddFriend(post.author)}
                    >
                      Add Friend
                    </Button>
                  )}
                  {userInfo.userId === post.author && (
                    <Button
                      flex="1"
                      variant="ghost"
                      leftIcon={<FontAwesomeIcon icon={faTrash} />}
                      className="delete"
                      onClick={() => handleDelete(post._id)}
                    >
                      Delete
                    </Button>
                  )}
                  <Button
                    flex="1"
                    variant="ghost"
                    leftIcon={<BiChat />}
                    className="add-comment-button"
                    onClick={() => handleAddComment(post._id)}
                  >
                    Comment
                  </Button>
                  <Button flex="1" variant="ghost" leftIcon={<BiLike />}>
                    Like
                  </Button>
                </CardFooter>
                <PostComments post={post} />
                <div className="add-comment">
                  <textarea
                    className="comment-input"
                    placeholder="Add a comment"
                    value={newComment[post._id]}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
