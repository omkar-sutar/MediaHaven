import React from 'react';
import './header.css';
import { deleteJWTToken } from '../pages/media/apis';

export function Header(props) {
    const handleLogout = () => {
        // Implement your logout logic here
        console.log("User logged out");
        const setShowLogin=props.setShowLogin
        deleteJWTToken()
        setShowLogin(true)
    };

    return (
        <header className="header">
            <div className="header-title">mediaHaven</div>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </header>
    );
}
