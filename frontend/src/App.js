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
    <UserContext.Provider value={{user,setUser,userInfo,setUserInfo}}>
   <Navbar  logout={logout} />
      <Routes>
     
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/addpost' element={<AddPost/>}/>
        <Route path='/ProfilePage' element={<ProfilePage />}/>
        
      </Routes>
     
  </UserContext.Provider>
  )
}


export default App;
