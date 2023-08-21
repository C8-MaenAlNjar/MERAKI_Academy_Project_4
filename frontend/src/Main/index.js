import React  from "react";

import{Link} from 'react-router-dom'

const Main =()=>{
    return (
<div>
    <h1> HELLO</h1>
    <nav>
        <ul>
            <li><Link to='/login'>Login</Link></li>
        </ul>
        <ul>
            <li><Link to='/register'>Register</Link></li>
        </ul>
    </nav>
</div>
    )
}

export default Main