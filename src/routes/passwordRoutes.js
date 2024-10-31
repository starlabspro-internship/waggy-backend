const express = require('express');
const passwordController = require('../controllers/passwordController');
const router = express.Router();

router.post('/forgot', passwordController.forgotPassword);
router.post('/reset/:token', passwordController.resetPassword);


const registerRoutes = (app) => {
  app.use('/api/password', router); 
};
module.exports = registerRoutes;