import React from "react";
import { Link } from 'react-router-dom'
import './style.css'

const HomePage = () => {
    return (
        <div className="main">
            <h1 className="homepage">Laugh Tale</h1>
            <ul className="Links">
                <li className="link1"><Link to='/login'>Login</Link></li>
                <li className="link1"><Link to='/register'>Register</Link></li>
            </ul>
        </div>
    )
}

export default HomePage;
