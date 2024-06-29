const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    category: String,
    ownername: String,
    phoneno: String,
    cost: String,
    area: String,
    description: String,
    photo: String,
    ownerId: { type: String },
    appliedTenants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'houseusers'
        }
    ],
    currentTenant: { type: mongoose.Schema.Types.ObjectId, ref: 'houseusers', default: null }
});

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;


