const { Blog, User } = require('../models');

exports.createBlog = async (req, res) => {
  const { title, description, articleImage, userID } = req.body;
  try {
    const newBlog = await Blog.create({ title, description, articleImage, userID });
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [{ model: User, as: 'author' }], // Include author details
    });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};