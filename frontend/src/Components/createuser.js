import React, { useState } from 'react'
import axios from 'axios';
const Createuser = () => {
  const [name,setName] = useState('');
  const [age,setAge] = useState('');
  const handleSubmit = async(e)=>{
    e.preventDefault();

    //posting our data to backend ==> axios.post 
    //axios.post => ('/url',{json})
    try {
        const newUser={
            name: name,
            age: age,
        };
        const response = await axios.post('http://localhost:5000/users',newUser);
        console.log('user is created',response.data);
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <div>
        <h1>createuser</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>name:</label>
                <input type='text' value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div>
                <label>age:</label>
                <input type='text' value={age} onChange={(e)=>setAge(e.target.value)} />
            </div>
            <button type='submit'>create</button>
        </form>
    </div>
  )
}

export default Createuser;