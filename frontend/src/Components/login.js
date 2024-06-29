import React, { useState } from 'react'
import '../styles/login.css';
import mail_icon from '../assets/email.png';
import user_icon from '../assets/person.png';
import pass_icon from '../assets/password.png';
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userType, setUserType] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const navigate = useNavigate()

    const handleUserTypeChange = (type) => {
        setUserType(type);
    };

    const handlelogin = async (e) => {
        e.preventDefault();
        if (!email || !password || !userType) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password, userType })
            });
            const data = await response.json();
            if (response.ok) {
                if (userType === 'Owner') {
                    navigate('/owner');
                } else if (userType === 'Tenant') {
                    navigate('/tenant');
                }
                localStorage.setItem("token", data.token);
            } else {
                alert(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
            alert('An error occurred. Please try again later.');
        }

    }

    return (
        <div>
            <div className='backgroundd'>
                <Navbar></Navbar>
                <form onSubmit={handlelogin}>
                    <div className="container">
                        <div className="header">
                            <div className="text">Login</div>
                            <div className="underline"></div>
                        </div>

                        <div className="inputs">
                            <div className="input">
                                <img src={mail_icon} alt="" />
                                <input type="email" placeholder="email" value={email} onChange={(e) => setemail(e.target.value)} />
                            </div>

                            <div className="input">
                                <img src={pass_icon} alt="" />
                                <input type="password" placeholder="password" value={password} onChange={(e) => setpassword(e.target.value)} />
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