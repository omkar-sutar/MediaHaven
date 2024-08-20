import React, { useState, useTransition } from 'react';
import './header.css';
import { deleteJWTToken } from '../pages/media/apis';
import userIcon from "../assets/user-pink.svg"
import { Link } from 'react-router-dom';

export function Header(props) {
    const handleLogout = () => {
        // Implement your logout logic here
        console.log("User logged out");
        const setShowLogin=props.setShowLogin
        deleteJWTToken()
        setShowLogin(true)
    };

    const [showDropDown,setShowDropDown] = useState(false)


    return (
        <header className="header">
            <div className="header-title">mediaHaven</div>

            <img className='header-profile-icon' src={userIcon} alt="nooo" onClick={()=>setShowDropDown(prev=>!prev)}></img>

            {showDropDown && 
                <div id='header-profile-dropdown'>
                    <div className='header-dropdown-row'>
                    <Link to={"/settings"} >Settings</Link>
                    </div>
                    <div className='header-dropdown-row'>
                        <a onClick={handleLogout}>Logout</a>
                    </div>
                </div>}
        </header>
    );
}
