import React from "react";
import './Header.css'
import logo from '../../Images/RDBRLogo.png';

const Header =()=>{
    return (
        <div className="Header">
            <img className="logo" src={logo}></img>
        </div>
    )
}

export default Header;