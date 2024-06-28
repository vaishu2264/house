const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    userType: { type: String, enum: ['Owner', 'Tenant'] }
});

const loginuser = mongoose.model("houseusers", UserSchema);

module.exports = loginuser;
