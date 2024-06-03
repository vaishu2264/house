const loginuser = require('../models/loginuser');

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
    try{
        const User = new loginuser(req.body);
        await User.save();
        res.status(201).send(User);
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



