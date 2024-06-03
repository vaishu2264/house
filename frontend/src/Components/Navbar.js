import React, { useState } from 'react'
import '../styles/Navbar.css'
import user_icon from '../assets/person.png';
import { Link } from "react-router-dom";

const Navbar = () => {
    const [showOptions, setShowOptions] = useState(false);
    const handleImageClick = () => {
        setShowOptions(!showOptions);
    };
    return (
        <div className="navbar">
            <ul className="navbar-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
            </ul>
            <img src={user_icon} alt="Options" className="options-icon" onClick={handleImageClick} />
            {showOptions && (
                <ul className="icon-options">
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/admin">Admin</Link></li>
                    <li><Link to="/">Logout</Link></li>
                </ul>
            )}
        </div>
    )
}

export default Navbar