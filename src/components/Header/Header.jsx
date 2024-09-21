import React from "react";
import './Header.css'
import { Link } from "react-router-dom";
import logo from '../../Images/RDBRLogo.png';

const Header =()=>{
    return (
        <div className="Header">
            <Link to="/"><img alt="header" className="logo" src={logo} ></img>   </Link>
            
        </div>
    )
}

export default Header;