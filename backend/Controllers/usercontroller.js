const user = require('../models/user');

exports.getAllUsers = async(req,res)=>{
    try{
        const users = await user.find({});
        res.send(users)
    }
    catch(error){
        res.status(500).send(error)
    }
}

exports.createUser = async (req,res)=>{
    try{
        const User = new user(req.body);
        await User.save();
        res.status(201).send(User);
    }
    catch (error){
        res.status(500).send(error)
    }
}

exports.deleteUser = async (req,res)=>{
    try{
        const User = await user.findByIdAndDelete(req.params.id);
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
        const User = await user.findByIdAndUpdate(req.params.id,req.body);
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
        const User = await user.findById(req.params.id);
        if(!User){
            return res.status(404).send("user does not exist")//if user found
        }        
        res.send(User)//if user found
    }
    catch (error){
        res.status(500).send(error)
    }
}



