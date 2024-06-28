const express = require('express');

const router = express.Router();
const loginController = require('../Controllers/logincontroller')
const updatecontroller = require('../Controllers/uploadcontroller')

router.get('/houseusers',loginController.getAllUsers)
router.get('/houseusers/:id',loginController.getUserById)
router.post('/houseusers',loginController.createUser)
router.delete('/houseusers/:id',loginController.deleteUser)
router.put('/houseusers/:id',loginController.updateUser)
router.post('/login', loginController.authenticateUser)
router.post('/uploads', updatecontroller.uploadMiddleware, updatecontroller.createrenter);
router.get('/uploads', updatecontroller.getAllUploads);
router.get('/uploads/owner/:ownerId', updatecontroller.getUploadsByOwner);


module.exports = router;


