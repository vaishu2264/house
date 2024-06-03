import axios from 'axios';
import { useEffect, useState } from 'react';
const Userlist = () => {
    const [users,setUsers] = useState([]);
    const fetchUsers = async ()=>{
        try {
            const response = await axios.get('http://localhost:5000/users');
            console.log('response',response.data);
            setUsers(response.data);
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(()=>{
        fetchUsers();
    },[]);
  return (
    <div>
        <ul>
            {users.map((user) => (
                <li>{user.name}</li>
            ))} 
        </ul>
    </div>
  )
}

export default Userlist;