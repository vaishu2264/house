import React, { useState } from 'react'
import '../styles/register.css';
import axios from 'axios';
import mail_icon from '../assets/email.png';
import user_icon from '../assets/person.png';
import pass_icon from '../assets/password.png';
import Navbar from './Navbar';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [userType, setUserType] = useState("");
    const [email,setemail] = useState('');
    const [password,setpassword] = useState('');
    const navigate = useNavigate()

  const handleregister = async(e)=>{
    e.preventDefault();
    try {
        const newUser={
            email: email,
            password: password,
            userType: userType,
        };
        const response = await axios.post('http://localhost:5000/houseusers',newUser);
        console.log('user is created',response.data);
        navigate('/Login')
    } catch (error) {
        console.log(error);
    }
  }

  
    return (
        <div>
            <div className='backgroundd'>
                <Navbar></Navbar>
                <form onSubmit={handleregister}>
                    <div className="container">
                        <div className="header">
                            <div className="text">Register</div>
                            <div className="underline"></div>
                        </div>

                        <div className="inputs">

                            <div className="input">
                                <img src={mail_icon} alt="" />
                                <input type="email" placeholder="email" value={email} onChange={(e)=>setemail(e.target.value)}/>
                            </div>

                            <div className="input">
                                <img src={pass_icon} alt="" />
                                <input type="password" placeholder="password" value={password} onChange={(e)=>setpassword(e.target.value)} />
                            </div>

                            <div className="input">
                                <img src={user_icon} alt="" />
                                <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                                    <option value="" disabled>Select User Type</option>
                                    <option value="Owner">Owner</option>
                                    <option value="Tenant">Tenant</option>
                                </select>
                            </div>

                        </div>

                        :<div className="Already-exists">Already have an account?  <span><Link to="/login">Login</Link></span></div>
                        <div className="submit-container">
                            <div>
                            <button type="submit" className="submit">Register</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;