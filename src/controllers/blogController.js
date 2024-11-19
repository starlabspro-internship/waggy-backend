const { Blog, User , Profile } = require('../models');

exports.createBlog = async (req, res) => {
  const { title, description, userID } = req.body;
  try {
    const articleImage = req.file ? `/uploads/${req.file.filename}` : null
    const newBlog = await Blog.create({ title, description, articleImage, userID });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [
        {
          model: User,
          as: 'author',
          attributes: { exclude: ['password', 'resetPassword', 'resetPasswordExpires', 'resetPasswordToken', 'refreshToken'] }, // Excluding sensitive fields
          include: [
            {
              model: Profile,
              as: 'profile', // Assuming Profile is associated with User
            }
          ]
        }
      ]
    });

    // Send the data back
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.viewBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findOne({
      where: { id },
      include: [{ model: User, as: 'author' }],
    });

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Find the blog by ID
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ error: 'Blog not found.' });
    }

    // Prepare data for update
    const updatedData = {
      title: req.body.title || blog.title,
      description: req.body.description || blog.description,
    };

    // If a new image is uploaded, add it to the updated data
    if (req.file) {
      updatedData.articleImage = `/uploads/${req.file.filename}`; // Save the file path or URL as needed
    }

    // Update blog details
    const updatedBlog = await blog.update(updatedData);

    // Return the updated blog
    res.status(200).json({ message: 'Blog updated successfully', updatedBlog });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the blog.' });
  }
};

exports.deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    await blog.destroy();
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};