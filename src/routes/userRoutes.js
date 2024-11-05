
const express = require('express');
const {

  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();


router.get('/list', getAllUsers); 
router.get('/view/:id', authMiddleware,getUserById); 
router.put('/update/:id', updateUser); 
router.delete('/remove/:id', deleteUser); 

const registerRoutes = (app) => {
    app.use('/api/users', router); 
  };
module.exports = registerRoutes;