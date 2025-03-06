const express = require('express');
const authController = require('../../controllers/v1/authController');
const authenticateJWT = require('../../Middlewares/authMiddleware');
const router = express.Router();



router.post('/signup', authController.signup);
router.post('/login', authController.login);



module.exports = router;
