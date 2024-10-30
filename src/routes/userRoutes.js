
const express = require('express');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.post('/', createUser); 
router.get('/', getAllUsers); 
router.get('/:id', getUserById); 
router.put('/:id', updateUser); 
router.delete('/:id', deleteUser); 

const registerRoutes = (app) => {
    app.use('/api', router); 
  };
module.exports = registerRoutes;