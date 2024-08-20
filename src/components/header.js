import React, { useState, useTransition } from 'react';
import './header.css';
import userIcon from "../assets/user-pink.svg"
import { Link, useNavigate } from 'react-router-dom';
import { deleteJWTToken } from '../utils';

export function Header(props) {
    const handleLogout = () => {
        // Implement your logout logic here
        console.log("User logged out");
        const setShowLogin=props.setShowLogin
        deleteJWTToken()
        setShowLogin(true)
    };

    const [showDropDown,setShowDropDown] = useState(false)
    const navigate = useNavigate()


    return (
        <header className="header">
            <div className="header-title" > <Link  to={"/navigate"}>mediaHaven</Link></div>

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
