const express = require('express');
const authController = require('../../controllers/v1/authController');
const upload = require("../../middlewares/upload"); 
const router = express.Router();



router.post("/signup", upload.single("profileImage"), authController.signup);
router.post('/login', authController.login);
router.post('/updatePassword', authController.updatePassword);




module.exports = router;
