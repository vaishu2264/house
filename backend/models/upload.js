const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    category: String,
    ownername: String,
    phoneno: String,
    cost: String,
    area: String,
    description: String,
    photo: String,
    ownerId: { type:String } // Assuming 'User' is your user model
});

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;


