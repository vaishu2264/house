const express = require('express');
const router = express.Router();
const loginController = require('../Controllers/logincontroller')

router.get('/houseusers',loginController.getAllUsers)
router.get('/houseusers/:id',loginController.getUserById)
router.post('/houseusers',loginController.createUser)
router.delete('/houseusers/:id',loginController.deleteUser)
router.put('/houseusers/:id',loginController.updateUser)


module.exports = router;