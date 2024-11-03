const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

// User Registration
router.post(
  '/register',
  (req, res, next) => {
    console.log('User Registered!'); // Log request data
    next();
  },
  authController.registerUser
);

// User Login
router.post('/login', authController.loginUser);
router.post('/token', authController.refreshToken);
router.get('/refreshToken', authMiddleware, authController.refreshToken);

const auth = (app) => {
  app.use('/auth', router);
};
// Protected Refresh Token Route
module.exports = auth;
