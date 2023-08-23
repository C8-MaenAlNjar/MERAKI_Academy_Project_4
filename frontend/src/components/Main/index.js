import React  from "react";
import{Link} from 'react-router-dom'
import './style.css'

const HomePage =()=>{
    return (
<div className="main">
    <h1> HeLLo</h1>
    <nav>
        <Link to='/login'></Link>
        <Link to='/register'></Link>
    </nav>
   
</div>
    )
}

export default HomePage