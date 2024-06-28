import React, { useState } from 'react'
import '../styles/Navbar.css'
import user_icon from '../assets/person.png';
import { Link } from "react-router-dom";

const Navbar2 = () => {
    const [showOptions, setShowOptions] = useState(false);
    const handleImageClick = () => {
        setShowOptions(!showOptions);
    };
    return (
        <div className="navbar">
            <img src={user_icon} alt="Options" className="options-icon" onClick={handleImageClick} />
            {showOptions && (
                <ul className="icon-options">
                    <li><Link to="/">Logout</Link></li>
                </ul>
            )}
        </div>
    )
}

export default Navbar2