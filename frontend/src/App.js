import "./App.css";
import React,{createContext ,useState} from "react";
import{Route,Routes}from "react-router-dom"
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Main from './Main/index'
import { useNavigate } from 'react-router-dom';
import Navbar from "./components/Navbar";





export const UserContext = createContext();




function App() {


  const [user, setUser] = useState(null);
  const navigate = useNavigate();


const logout =()=>{
  localStorage.clear();
  setUser(null)
  navigate('/login')
}




  return (
    <UserContext.Provider value={{user,setUser}}>
   <Navbar isLog={!!user} logout={logout} />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
     
  </UserContext.Provider>
  );
}


export default App;
