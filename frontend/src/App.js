import "./App.css";
import React,{createContext ,useState,useEffect} from "react";
import{Route,Routes}from "react-router-dom"
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import HomePage from './components/Main'
import { useNavigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import AddPost from './components/Addpost'
import ProfilePage from './components/profilepage'
import SideBar from "./components/sideBar";
import { ChakraProvider } from '@chakra-ui/react';
import EditePage from "./components/Edite page";
import { CSSReset, ColorModeScript } from '@chakra-ui/react';
import Chat from './components/Chat'
import Conversation from './components/Conversation/inedx'
import Message from "./components/Message/inedex";

export const UserContext = createContext();




function App() {

  const Navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  const [userInfo, setUserInfo] = useState(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
   
    return storedUserInfo ? JSON.parse(storedUserInfo) : { user: null, friends: [] };
  });

    




const logout =()=>{
  
  localStorage.clear();
  setUser(null)
  setUserInfo({ user: null, friends: [] })
  Navigate('/login')
}




  return (
    <UserContext.Provider value={{user,setUser,userInfo,setUserInfo,}}>
         <ChakraProvider>


       
        <Navbar  logout={logout} /> 
      <Routes>
     
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/addpost' element={<AddPost/>}/>
        <Route path='/ProfilePage' element={<ProfilePage />}/>
        <Route path='/sidBar' element={<SideBar />}/>
        <Route path="/Edite" element={<EditePage />}/>
        <Route path='/Chat' element={<Chat />}/>
        <Route path='/conversation' element={<Conversation />}/>
        <Route path="/message" element={<Message />}/>
       </Routes>
       
  
      </ChakraProvider>
  </UserContext.Provider>
  )
}


export default App;
