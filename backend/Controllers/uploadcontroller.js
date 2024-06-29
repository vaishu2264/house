const multer = require('multer');
const path = require('path');
const Upload = require("../models/upload");
const LoginUser = require("../models/loginuser");
const jwt = require('jsonwebtoken');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


exports.uploadMiddleware = upload.single('photo');

exports.applyForHome = async (req, res) => {
    const { houseId } = req.params;
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    try {
        const token = authHeader;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        let house = await Upload.findById(houseId);
        if (!house) {
            return res.status(404).json({ error: 'House not found' });
        }
        let user = await LoginUser.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        house.appliedTenants.push(user._id);
        await house.save();
        res.status(200).json({ message: 'Applied Successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateCurrentTenant = async (req, res) => {
    const { houseId, tenantId } = req.params;
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    try {
        const token = authHeader;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const ownerId = decoded.id;

        const house = await Upload.findById(houseId);
        if (!house) {
            return res.status(404).json({ error: 'House not found' });
        }
        if (house.ownerId.toString() !== ownerId) {
            return res.status(403).json({ error: 'Unauthorized' });
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

exports.createrenter = async (req, res) => {
    const { category, ownername, phoneno, cost, area, description } = req.body;
    const photo = req.file ? req.file.filename : null;

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    try {
        const token = authHeader;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const ownerId = decoded.id;

        const newUpload = new Upload({
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

exports.getUploadsByOwner = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    try {
        const token = authHeader;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const ownerId = decoded.id;
        const uploads = await Upload.find({ ownerId });
        res.status(200).send(uploads);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getNotifications = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    try {
        const decoded = jwt.verify(authHeader, process.env.JWT_SECRET);
        const ownerId = decoded.id;
        const houses = await Upload.find({ ownerId, currentTenant: null }).populate('appliedTenants', '_id email');
        const notifications = houses.map(house => ({
            houseId: house._id,
            houseName: house.category,
            ownerName: house.ownername,
            appliedTenants: house.appliedTenants.map(tenant => ({
                _id: tenant._id,
                email: tenant.email
            }))
        }));
        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.unAssignTenant = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const ownerId = decoded.id;
        const { houseId } = req.params;
        const house = await Upload.findOne({ _id: houseId, ownerId });
        if (!house) {
            return res.status(404).json({ message: 'House not found' });
        }
        house.currentTenant = null;
        await house.save();
        res.status(200).json({ message: 'Tenant unassigned successfully' });
    } catch (error) {
        console.error('Error unassigning tenant:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


exports.assignedHouses = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const ownerId = decoded.id;

        const houses = await Upload.find({ ownerId, currentTenant: { $ne: null } });
        res.status(200).json(houses);
    } catch (error) {
        console.error('Error fetching houses with assigned tenants:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getUploads = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    try {
        const token = authHeader;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const uploads = await Upload.find({ currentTenant: userId });
        res.status(200).json(uploads);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.getAvailableUploads = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }

    try {
        const token = authHeader;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const uploads = await Upload.find({
            currentTenant: null,
            appliedTenants: { $nin: [userId] }
        });

        res.status(200).json(uploads);
    } catch (error) {
        console.error('Error fetching available uploads:', error);
        res.status(500).json({ message: errorMessage });
    }
};


exports.getRequestedUploads = async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header missing' });
    }
    try {
        const token = authHeader;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const houses = await Upload.find({ currentTenant: null, appliedTenants: userId });
        res.status(200).json(houses);
    } catch (error) {
        console.error('Error fetching applied houses:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}