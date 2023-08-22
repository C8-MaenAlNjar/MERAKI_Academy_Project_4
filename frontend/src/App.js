import "./App.css";
import React,{createContext ,useState} from "react";
import{Route,Routes}from "react-router-dom"
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import HomePage from './components/Main'
import { useNavigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import AddPost from './components/Addpost'




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
   <Navbar  logout={logout} />
      <Routes>
        <Route path="/HomePage" element={<HomePage />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/addpost' element={<AddPost/>}/>
      </Routes>
     
  </UserContext.Provider>
  );
}


export default App;
