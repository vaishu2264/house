const loginuser = require('../models/loginuser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const { email, password, userType } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const User = new loginuser({ email, password: hashedPassword, userType });
        await User.save();
        res.status(201).send(User);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.authenticateUser = async (req, res) => {
    const { email, password, userType } = req.body;
    try {
        const user = await loginuser.findOne({ email, userType });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const payload = {
                    id: user._id,
                    email: user.email
                };
                jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                    if (err) {
                        console.error('JWT Error:', err);
                        res.status(500).json({ message: 'Error creating JWT' });
                    } else {
                        res.json({
                            message: 'Success',
                            token: token
                        });
                    }
                });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
};
