import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGears,
  faUser,
  faBell,
  faLanguage,
  faBookmark,
  faQuestion,
  faAddressCard,
} from "@fortawesome/free-solid-svg-icons";
import { Input } from '@chakra-ui/react'
import { IconButton,Button } from "@chakra-ui/react";
import { faPlus, faImage } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const EditePage = () => {
  const [selectedTab, setSelectedTab] = useState("GENERAL");
  const tabs = {
    GENERAL:  (
        <div className="tabContent">
          <h2>General Settings</h2>
          <div className="generalOptions">
         
            <div className="option">
              <h3>Change Password</h3>
              <div className="passwordChangeForm">
                <Input 
                  type="password"
                  placeholder="Old Password"
                 
                />
                <Input
                  type="password"
                  placeholder="New Password"
                 
                />
                <Input
                  type="password"
                  placeholder="Confirm New Password"
                 
                />
                <Button colorScheme='teal' size='md' >
                  Change Password
                </Button>
              </div>
            </div>
    
           
            <div className="option">
              <h3>Change Email</h3>
              <div className="emailChangeForm">
                <Input 
                  type="email"
                  placeholder="Old Email"
                />
                <Input 
                  type="email"
                  placeholder="New Email"
                />
                <Input
                  type="password"
                  placeholder="Password"
                />
                <Button colorScheme='teal' size='md'>Change Email</Button>
              </div>
            </div>
    
           
            <div className="option">
              <h3>Change Profile Image</h3>
              <div className="profileImageChangeForm">
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
       
      />
    </label>
                <Button colorScheme='teal' size='md' >
                  Change Profile Image
                </Button>
              </div>
            </div>
          </div>
        </div>
      ),
    PROFILE: (
      <div className="tabContent">
        <p>Profile Content</p>
        <img src="https://res.cloudinary.com/dmhvb05w3/image/upload/v1693662933/p4/r83f0uun9hyvvu10h24i.jpg" alt="Profile Image" />
      </div>
    ),
    NOTIFICATIONS: (
      <div className="tabContent">
        <p>Notifications Content</p>
        <img src="https://res.cloudinary.com/dmhvb05w3/image/upload/v1693662941/p4/lfwk7vkrxn6ta304u2oz.webp" />
      </div>
    ),
    LANGUAGE: (
      <div className="tabContent">
        <p>Language Content</p>
        <img src="https://res.cloudinary.com/dmhvb05w3/image/upload/v1693662949/p4/hpql3u0fxqof835zwu8e.jpg"></img>
      </div>
    ),
    APPEARANCE: (
      <div className="tabContent">
        <p>Appearance Content</p>
        <img src="https://res.cloudinary.com/dmhvb05w3/image/upload/v1693662961/p4/wwtaozkhtwqd7qc7tt8m.jpg"/>
      </div>
    ),
    PLUGINS: (
      <div className="tabContent">
        <p>Plugins Content</p>
        <img src="https://res.cloudinary.com/dmhvb05w3/image/upload/v1693663000/p4/ob3aic1uihvirpwccxxg.jpg"/>
      </div>
    ),
    ABOUT: (
      <div className="tabContent">
        <p>About Content</p>
        <img src="https://res.cloudinary.com/dmhvb05w3/image/upload/v1693663013/p4/uqxyqscpgdvgvydogrgh.jpg"/>
      </div>
    ),
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="editePageContainer">
      <div className="sidebars">
        <div className="sidebarWrapper">
          <ul className="sidebarList">
            <button
              className={`sidebarsListItem ${
                selectedTab === "GENERAL" ? "active" : ""
              }`}
              onClick={() => handleTabClick("GENERAL")}
            >
              <FontAwesomeIcon icon={faGears} />
              <span className="sidebarListItemText">GENERAL</span>
            </button>
            <button
              className={`sidebarsListItem ${
                selectedTab === "PROFILE" ? "active" : ""
              }`}
              onClick={() => handleTabClick("PROFILE")}
            >
              <FontAwesomeIcon icon={faUser} />
              <span className="sidebarListItemText">Profile</span>
            </button>
            <button
              className={`sidebarsListItem ${
                selectedTab === "NOTIFICATIONS" ? "active" : ""
              }`}
              onClick={() => handleTabClick("NOTIFICATIONS")}
            >
              <FontAwesomeIcon icon={faBell} />
              <span className="sidebarListItemText">Notifications</span>
            </button>
            <button
              className={`sidebarsListItem ${
                selectedTab === "LANGUAGE" ? "active" : ""
              }`}
              onClick={() => handleTabClick("LANGUAGE")}
            >
              <FontAwesomeIcon icon={faLanguage} />
              <span className="sidebarListItemText">Language</span>
            </button>
            <button
              className={`sidebarsListItem ${
                selectedTab === "APPEARANCE" ? "active" : ""
              }`}
              onClick={() => handleTabClick("APPEARANCE")}
            >
              <FontAwesomeIcon icon={faBookmark} />
              <span className="sidebarListItemText">Appearance</span>
            </button>
            <button
              className={`sidebarsListItem ${
                selectedTab === "PLUGINS" ? "active" : ""
              }`}
              onClick={() => handleTabClick("PLUGINS")}
            >
              <FontAwesomeIcon icon={faQuestion} />
              <span className="sidebarListItemText">Plugins</span>
            </button>
            <button
              className={`sidebarsListItem ${
                selectedTab === "ABOUT" ? "active" : ""
              }`}
              onClick={() => handleTabClick("ABOUT")}
            >
              <FontAwesomeIcon icon={faAddressCard} />
              <span className="sidebarListItemText">About</span>
            </button>
          </ul>
        </div>
      </div>
      <div className="contentContainer">
        <div
          className={`tabContent ${
            selectedTab === "GENERAL" ? "centered" : ""
          }`}
        >
          {tabs[selectedTab]}
        </div>
      </div>
    </div>
  );
  
};
export default EditePage;
