const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: { 
        type: String, 
        enum: ['Owner', 'Tenant'],
         required: true 
    }
});

const loginuser = mongoose.model("houseusers", UserSchema);

module.exports = loginuser;
