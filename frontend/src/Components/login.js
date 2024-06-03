import React, { useState } from 'react'
import '../styles/login.css';
import mail_icon from '../assets/email.png';
import user_icon from '../assets/person.png';
import pass_icon from '../assets/password.png';
import Navbar from './Navbar';
import { Link } from "react-router-dom";

const Login = () => {
    const [userType, setUserType] = useState('');

    const handleUserTypeChange = (type) => {
        setUserType(type);
    };

    return (
        <div>
            <div className='backgroundd'>
                <Navbar></Navbar>
                <form>
                    <div className="container">
                        <div className="header">
                            <div className="text">Login</div>
                            <div className="underline"></div>
                        </div>

                        <div className="inputs">
                            <div className="input">
                                <img src={mail_icon} alt="" />
                                <input type="email" placeholder="email"  />
                            </div>

                            <div className="input">
                                <img src={pass_icon} alt="" />
                                <input type="password" placeholder="password" />
                            </div>

                            <div className="input">
                                <img src={user_icon} alt="" />
                                <select value={userType} onChange={(e) => handleUserTypeChange(e.target.value)}>
                                    <option value="" disabled>Select User Type</option>
                                    <option value="Owner">Owner</option>
                                    <option value="Tenant">Tenant</option>
                                </select>
                            </div>

                        </div>

                        <div className="forgot-password">Forgot password? <span><Link to="/forget">Click Here!</Link></span></div>
                        <div className="forgot-password">Dont have an account? <span><Link to="/register">register!</Link></span></div>

                        <div className="submit-container">
                            <button type="submit" className="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login