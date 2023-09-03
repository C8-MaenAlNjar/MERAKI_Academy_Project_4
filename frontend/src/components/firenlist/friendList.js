import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../App";
import "./style.css";

const FriendsList = () => {
  const [friendList, setFriendsList] = useState([]);
  const { userInfo } = useContext(UserContext);
  
  useEffect(() => {
    const callHomi = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5000/FriendsList/${userInfo.userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFriendsList(response.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    callHomi();
  }, [userInfo]);

  return (
    <div className="friendList">
      <div>
        {friendList &&
          friendList.map((friend) => (
            <li key={friend._id} className="friend-item">
              <div className="friend-info">
                <img
                  src={friend.image}
                  alt={friend.name}
                  className="friend-image"
                />
                <div className="friend-details">
                  <h3 className="friend-name">{friend.name}</h3>
                  <p className="friend-username">{friend.username}</p>
                </div>
              </div>
            </li>
          ))}
      </div>
    </div>
  );
};
export default FriendsList;
