import React from 'react'
import '../styles/Navbar.css'
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <div className="navbar">
            <ul className="navbar-menu">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                {/* <li><Link to="/contactus">Contact us</Link></li>
                <li><Link to="aboutus">About us</Link></li> */}
            </ul>
        </div>
    )
}

export default Navbar