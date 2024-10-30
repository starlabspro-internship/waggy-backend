const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Route to create a new blog post
router.post('/', blogController.createBlog);

// Route to get all blog posts
router.get('/', blogController.getBlogs);

module.exports = router;