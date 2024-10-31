const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// User Registration
router.post('/register', authController.registerUser);

// User Login
router.post('/login', authController.loginUser);

// Refresh Token
router.get('/refreshToken', authMiddleware, authController.refreshToken);

module.exports = router;
