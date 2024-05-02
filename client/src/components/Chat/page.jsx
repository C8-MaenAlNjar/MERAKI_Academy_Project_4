import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
const Chat = () => {
  const [chat, setChat] = useState(null);
  const [chats, setChats] = useState();
  useEffect(() => {
    getChats();
  },[]);
  const getChats = async () => {
    try {
      const postPromise = await apiRequest.get("/chat");
      if (postPromise && postPromise.data) {
        setChats(postPromise.data);
      } else {
        console.log("Invalid response format:", postPromise);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext);

  const handleOpenChat = async (id, receiver) => {
    try {
      const res = await apiRequest("/chat/" + id);
      if (!res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("text");

    if (!text) return;
    try {
      const res = await apiRequest.post("/message/" + chat.id, { text });
      setChat((prev) => ({ ...prev, messages: [...prev.messages, res.data] }));
      e.target.reset();
      socket.emit("sendMessage", {
        receiverId: chat.receiver.id,
        data: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const read = async () => {
      try {
        await apiRequest.put("chat/read/" + chat.id);
      } catch (err) {
        console.log(err);
      }
    };
    if (chat && socket) {
      socket.on("getMessage", (data) => {
        console.log("get", data);
        if (chat?.id === data?.chatId) {
          console.log("ok!");
          setChat((prev) => ({ ...prev, messages: [...prev.messages, data] }));
          read();
        }
      });
    }
  }, [socket, chat]);
  return (
    <div className="chat">
      <div className="messages">
        <h1>Messages</h1>
        {chats?.map((c) => (
          <div
            className="message"
            key={c.id}
            style={{
              backgroundColor:
                (c.seenBy && c.seenBy.includes(currentUser.id)) ||
                chat?.id === c.id
                  ? "white"
                  : "#fecd514e",
            }}
            onClick={() => handleOpenChat(c.id, c.receiver)}
          >
            <img src={c.receiver?.avatar || "/noavatar.jpg"} alt="" />
            <span>{c.receiver?.username}</span>
            <p>{c.lastMessage}</p>
          </div>
        ))}
      </div>
      {chat && (
        <div className="chatBox">
          <div className="top">
            <div className="user">
              <img
                src={chat.receiver.avatar || "/noavatar.jpg"}
                alt="John Doe"
              />
              {chat.receiver.username}
            </div>
            <span className="close">X</span>
          </div>
          <div className="center">
            {chat.messages.map((message) => (
              <div
                className="chatMessage"
                style={{
                  alignSelf:
                    message.userId === currentUser.id
                      ? "flex-end"
                      : "flex-start",
                  textAlign:
                    message.userId === currentUser.id ? "right" : "left",
                }}
              >
                <p>{message.text}</p>
                <span>{format(message.createdAt)}</span>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="bottom">
            <textarea name="text"></textarea>
            <button>Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Chat;
