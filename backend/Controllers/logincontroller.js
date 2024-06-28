const loginuser = require('../models/loginuser');
const bcrypt = require('bcrypt');  
const { response } = require('express');

exports.getAllUsers = async(req,res)=>{
    try{
        const users = await loginuser.find({});
        res.send(users)
    }
    catch(error){
        res.status(500).send(error)
    }
}

exports.createUser = async (req,res)=>{
    const {email, password, userType} = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        try{
            const User = new loginuser({email, password: hashedPassword, userType});
            await User.save();
            res.status(201).send(User);
        }
        catch (error){
            res.status(500).send(error)
        }
    }
    catch (error){
        res.status(500).send(error)
    }
}

exports.deleteUser = async (req,res)=>{
    try{
        const User = await loginuser.findByIdAndDelete(req.params.id);
        if(!User){
            return res.status(404).send("user does not exist")//if user found
        }        
        res.send(User)//if user found
    }
    catch (error){
        res.status(500).send(error)
    }
}

exports.updateUser = async (req,res)=>{
    try{
        const User = await loginuser.findByIdAndUpdate(req.params.id,req.body);
        if(!User){
            return res.status(404).send("user does not exist")//if user found
        }        
        res.send(User)//if user found
    }
    catch (error){
        res.status(500).send(error)
    }
}

exports.getUserById = async (req,res)=>{
    try{
        const User = await loginuser.findById(req.params.id);
        if(!User){
            return res.status(404).send("user does not exist")//if user found
        }        
        res.send(User)//if user found
    }
    catch (error){
        res.status(500).send(error)
    }
}


exports.authenticateUser = async (req, res) => {
    const { email, password, userType } = req.body;

    try {
        const user = await loginuser.findOne({ email, userType });
        if (user) {
            const passwordMatch = await bcrypt.compare(password,user.password);
                if(passwordMatch){
                    return res.json({ message: 'Success' });
                }
                else{
                    return res.status(401).json({ message: 'Invalid credentials' });
                }
        }
        else{
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};

