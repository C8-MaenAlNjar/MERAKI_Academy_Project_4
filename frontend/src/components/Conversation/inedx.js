import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

function Conversation({ conversation, currentUser }) {
  const [userData, setUser] = useState();

  useEffect(() => {
    const members = conversation.members;
    const friendId = members.find(memberId => memberId !== currentUser);
console.log("this",friendId);


    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/user/${friendId}`);
       
        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    
    getUser();
  }, [currentUser, conversation]);

 
  return (
    <div className="conversation">
    
      {userData ? (
        <>
          <img className="conversationImg" src={userData.image} alt="" />
          <span className="conversationName">{userData.name}</span>
        </>
      ) : (
        
        <div>Loading user data...</div>
      )}
    </div>
  );
}

export default Conversation;
