const express = require('express');
const passwordController = require('../controllers/passwordController');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.post('/forgot', passwordController.forgotPassword);
router.post('/reset/:token', passwordController.resetPassword);
router.put('/change', authMiddleware , passwordController.changePassword)
const registerRoutes = (app) => {
  app.use('/api/password', router);
};
module.exports = registerRoutes;
