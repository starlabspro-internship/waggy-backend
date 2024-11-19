const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../middleware/upload')
const authMiddleware = require('../middleware/auth');
router.post('/new', authMiddleware, upload.single('articleImage'), blogController.createBlog);
router.get('/list',authMiddleware, blogController.getBlogs);
router.get('/view/:id'  , blogController.viewBlog)



router.delete('/remove/:id' , authMiddleware, blogController.deleteBlog)
const registerRoutes = (app) => {
    app.use('/api/blogs', router); 
  };
module.exports = registerRoutes;

//create getBlogbyID , updateBlog and removeBlog