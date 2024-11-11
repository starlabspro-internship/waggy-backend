const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');
const upload = require('../middleware/upload')

router.post('/new',upload.single('articleImage'), blogController.createBlog);

router.get('/list', blogController.getBlogs);
router.get('/view/:id' , blogController.viewBlog)

router.put('/edit/:id',upload.single('articleImage') , blogController.updateBlog)

router.delete('/remove/:id' , blogController.deleteBlog)
const registerRoutes = (app) => {
    app.use('/api/blogs', router); 
  };
module.exports = registerRoutes;

//create getBlogbyID , updateBlog and removeBlog