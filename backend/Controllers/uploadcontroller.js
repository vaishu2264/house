const multer = require('multer');
const path = require('path');
const uploadModel = require('../models/upload');

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/'); // Folder to save uploaded images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Save file with timestamp
    }
});

// Initialize upload
const upload = multer({ storage: storage });

exports.createrenter = async (req, res) => {
    const { category, ownername, phoneno, cost, area, description, ownerId } = req.body;
    const photo = req.file ? req.file.filename : null;
    // Assuming req.user contains the logged-in user

    try {
        const newUpload = new uploadModel({
            category,
            ownername,
            phoneno,
            cost,
            area,
            description,
            photo,
            ownerId,
            appliedTenants: []
        });
        await newUpload.save();
        res.status(201).send(newUpload);
    } catch (error) {
        res.status(500).send(error);
    }
};


// Export multer middleware
exports.uploadMiddleware = upload.single('photo');

exports.getAllUploads = async (req, res) => {
    try {
        const uploads = await uploadModel.find({});
        res.status(200).send(uploads);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getUploadsByOwner = async (req, res) => {
    const ownerId = req.params.ownerId;
    try {
        const uploads = await uploadModel.find({ ownerId });
        res.status(200).send(uploads);
    } catch (error) {
        res.status(500).send(error);
    }
};

