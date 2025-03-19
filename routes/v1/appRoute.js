const express = require('express');
const appController = require('../../controllers/v1/appController');
const upload = require("../../middlewares/upload"); 
const router = express.Router();



router.post('/updateProfile',upload.single("profileImage"),  appController.updateProfile);
// router.put("/updateProfile", upload.single("profileImage"), authController.updateProfile);

// router.post('/updatePassword', appController.updatePassword);




module.exports = router;
