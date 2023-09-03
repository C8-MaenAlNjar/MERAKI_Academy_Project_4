import React from "react";
import "./style.css";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../../App";
import axios from "axios";
import Conversation from "../Conversation/inedx";
import Message from "../Message/inedex"



function Chat() {
  const scrollRef = useRef();
  const { userInfo } = useContext(UserContext);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();


 


  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/find/${userInfo.userId}`
        );
       
        setConversations(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();
  }, [userInfo]);


  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/chats/${currentChat._id}`);
        console.log(conversations);
        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender:userInfo.userId,
      text: newMessage,
      conversationId: currentChat._id,
    };

   
    try {
      const response = await axios.post("http://localhost:5000/makemessage", message);
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chat">
      <div className="chatMenu">
        <div className="chatMenuWrapper">
          <input placeholder="Search for friends" className="chatMenuInput" />
          {conversations.map((c) => (
             <div onClick={() => setCurrentChat(c)}>
            <Conversation conversation={c} currentUser={userInfo.userId} />
            </div>
          ))}
        </div>
      </div>
      <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div ref={scrollRef}>
                   <Message message={m} own={m.sender === userInfo.userId} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      <div className="chatOnline">
        <div className="chatOnlineWrapper">onlineUsers</div>
      </div>
    </div>
  );
}

export default Chat
