const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// To send the confirmation email
const sendEmail = require('../services/emailService');
const generateWelcomeEmail = require('../template/confirmationEmailTemplate');

// Registration function
exports.registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    // Send email to the user after creating account
    if(newUser){
      const emailContent = generateWelcomeEmail(newUser);
      sendEmail(newUser.email, 'Welcome to Waggy!', emailContent);
    }
    
    res.status(201).json({
      message: 'User registered successfully',
      userId: newUser.id,
    });


  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login function
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Generate and store the refresh token
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d', // Longer expiration for refresh tokens
    });

    console.log('About to update refresh token for user ID:', user.id);
    try {
      await User.update({ refreshToken }, { where: { id: user.id } });
      console.log('Refresh token updated successfully.');
    } catch (updateError) {
      console.error('Error updating refresh token:', updateError);
    }

    res.json({ token, refreshToken });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body; // Get refresh token from the request body

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.sendStatus(403); // Forbidden
    }

    // Generate new access token
    const newAccessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.sendStatus(403); // Forbidden
  }
};
