const express = require('express');
const appController = require('../../controllers/v1/appController');
const router = express.Router();



router.post('/updateProfile', appController.updateProfile);
// router.post('/updatePassword', appController.updatePassword);




module.exports = router;
