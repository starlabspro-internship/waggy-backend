const { User, Profile } = require("../models");
const sendEmail = require('../services/emailService');
const generateWelcomeEmail = require('../template/confirmationEmailTemplate');
// Create a new user
const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const emailContent = generateWelcomeEmail(user);
    // send email to the user after creating account
    sendEmail(user.email, 'Welcome to Waggy!', emailContent);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get all users

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      include: { model: Profile, as: "profile" },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get a single user by ID / inlcuding profile
const getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: { model: Profile, as: "profile" },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Update a user
const updateUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.update(req.body);
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      await user.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
