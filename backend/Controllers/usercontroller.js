const user = require('../models/user');
const Upload = require("../models/upload")
const loginuser = require("../models/loginuser")

exports.applyForHome = async (req, res) => {
    const { houseId, userId } = req.params;
    try {
        let house = await Upload.findById(houseId);
        if (!house) {
            return res.status(404).json({ error: 'House not found' });
        }
        let user = await loginuser.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        house.appliedTenants.push(user._id);
        await house.save();
        res.status(200).json({ "message": "Applied Successfully" });
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.updateCurrentTenant = async (req, res) => {
    const { houseId, tenantId } = req.params;
    try {
        const house = await Upload.findById(houseId);
        if (!house) {
            return res.status(404).json({ error: 'House not found' });
        }
        if (!house.appliedTenants.includes(tenantId)) {
            return res.status(400).json({ error: 'Tenant is not in the applied tenants list' });
        }
        house.currentTenant = tenantId;
        await house.save();
        res.status(200).json({ message: 'Current tenant updated successfully' });
    } catch (error) {
        res.status(500).json(error);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await user.find({});
        res.send(users)
    }
    catch (error) {
        res.status(500).send(error)
    }
}

exports.createUser = async (req, res) => {
    try {
        const User = new user(req.body);
        await User.save();
        res.status(201).send(User);
    }
    catch (error) {
        res.status(500).send(error)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const User = await user.findByIdAndDelete(req.params.id);
        if (!User) {
            return res.status(404).send("user does not exist")//if user found
        }
        res.send(User)//if user found
    }
    catch (error) {
        res.status(500).send(error)
    }
}

exports.updateUser = async (req, res) => {
    try {
        const User = await user.findByIdAndUpdate(req.params.id, req.body);
        if (!User) {
            return res.status(404).send("user does not exist")//if user found
        }
        res.send(User)//if user found
    }
    catch (error) {
        res.status(500).send(error)
    }
}

exports.getUserById = async (req, res) => {
    try {
        const User = await user.findById(req.params.id);
        if (!User) {
            return res.status(404).send("user does not exist")//if user found
        }
        res.send(User)//if user found
    }
    catch (error) {
        res.status(500).send(error)
    }
}