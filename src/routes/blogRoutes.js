const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/', blogController.createBlog);

router.get('/', blogController.getBlogs);

const registerRoutes = (app) => {
    app.use('/api/blogs', router); 
  };
module.exports = registerRoutes;