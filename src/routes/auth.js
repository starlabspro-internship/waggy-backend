const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// User Registration
// In src/routes/auth.js
router.post('/register', (req, res, next) => {
    console.log('Register endpoint hit with data:', req.body); // Log request data
    next();
  }, authController.registerUser);
  
// User Login
router.post('/login', authController.loginUser);
router.post('/token', authController.refreshToken); 

// Protected Refresh Token Route
router.get('/refreshToken', authMiddleware, authController.refreshToken);
module.exports = router;
