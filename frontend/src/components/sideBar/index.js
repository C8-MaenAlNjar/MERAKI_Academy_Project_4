import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faRss,
    faMessage,
    faPlay,
    faUserGroup,
    faBookmark,
    faQuestion,
    faGamepad,
    faCalendarDays,
  } from "@fortawesome/free-solid-svg-icons";

import './style.css'
import FriendsList from "../firenlist/friendList";
import { useNavigate } from 'react-router-dom';



const SideBar =()=>{
  const navigate = useNavigate();

  const handleChatButtonClick = () => {
   
    navigate('/Chat');
  };

return(
    <div className="sidebar">
           <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
          <FontAwesomeIcon icon={faRss} />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <button className="sidebarListItem" onClick={handleChatButtonClick}>
          <FontAwesomeIcon icon={faMessage} />
            <span className="sidebarListItemText">Chats</span>
          </button>
          <li className="sidebarListItem">
          <FontAwesomeIcon icon={faPlay} />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
          <FontAwesomeIcon icon={faUserGroup} />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
          <FontAwesomeIcon icon={faBookmark} />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
          <FontAwesomeIcon icon={faQuestion} />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
          <FontAwesomeIcon icon={faGamepad} />
            <span className="sidebarListItemText">Game</span>
          </li>
          <li className="sidebarListItem">
          <FontAwesomeIcon icon={faCalendarDays} />
            <span className="sidebarListItemText">Events</span>
          </li>
          
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <FriendsList />
       
      </div>


    </div>



)
}

export default SideBar