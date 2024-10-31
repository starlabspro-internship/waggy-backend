
const express = require('express');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/signup', createUser); 
router.get('/list', getAllUsers); 
router.get('/view/:id', getUserById); 
router.put('/update/:id', updateUser); 
router.delete('/remove/:id', deleteUser); 

const registerRoutes = (app) => {
    app.use('/api/users', router); 
  };
module.exports = registerRoutes;