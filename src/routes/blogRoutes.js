const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/new', blogController.createBlog);

router.get('/list', blogController.getBlogs);

const registerRoutes = (app) => {
    app.use('/api/blogs', router); 
  };
module.exports = registerRoutes;

//create getBlogbyID , updateBlog and removeBlog