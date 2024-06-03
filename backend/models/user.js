const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})

const user = mongoose.model("users",UserSchema)

module.exports = user;