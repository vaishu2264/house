const express = require('express');
const router = express.Router();
const loginController = require('../Controllers/logincontroller');
const updateController = require('../Controllers/uploadcontroller');

router.post('/houseusers', loginController.createUser);
router.post('/login', loginController.authenticateUser);

router.post('/uploads', updateController.uploadMiddleware, updateController.createrenter);
router.get('/uploads/owner', updateController.getUploadsByOwner);
router.post('/add/:houseId', updateController.applyForHome);
router.put('/select-tenant/:houseId/:tenantId', updateController.updateCurrentTenant);
router.get('/notifications', updateController.getNotifications);
router.put('/unassign-tenant/:houseId', updateController.unAssignTenant);
router.get('/houses/assigned', updateController.assignedHouses);
router.get('/active-notifications', updateController.getUploads);
router.get('/active-openings', updateController.getAvailableUploads);
router.get('/requested', updateController.getRequestedUploads);


module.exports = router;
