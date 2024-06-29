const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/usercontroller')

router.get('/users', UserController.getAllUsers)
router.get('/users/:id', UserController.getUserById)
router.post('/users', UserController.createUser)
router.delete('/users/:id', UserController.deleteUser)
router.put('/users/:id', UserController.updateUser)
router.post('/add/:houseId/:userId', UserController.applyForHome)
router.post('/select-tenant/:houseId/:tenantId', UserController.updateCurrentTenant)


module.exports = router;