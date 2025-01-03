const { User } = require('../models');
const sendEmail = require('../services/emailService');
const crypto = require('crypto');
const bcrypt = require('bcrypt'); // Hashing library
const { Op } = require('sequelize');
const generatePasswordResetEmail = require('../template/passwordResetedTemplate');
const generateForgotPasswordEmail = require('../template/forgotPasswordTemplate');

const passwordController = {
  // Forgot Password Handler
  async forgotPassword(req, res) {
    const { email } = req.body;
    console.log('Request body:', req.body);
    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Generate reset token and expiry
      const token = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

      await user.save();

      const resetUrl = `${process.env.WAGGY_FRONTEND_URL}/SetNewPassword.html?token=${token}`;
      await sendEmail(
        user.email,
        'Password Reset',
        generateForgotPasswordEmail(resetUrl)
      );
      res.status(200).json({
        message:
          'If this email is registered, you will receive a password reset link shortly.',
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Reset Password Handler
  async resetPassword(req, res) {
    const { token } = req.params;
    const { password } = req.body;

    // Ensure password is provided
    if (!password) {
      return res.status(400).json({ message: 'Password is required.' });
    }

    try {
      const user = await User.findOne({
        where: {
          resetPasswordToken: token,
          resetPasswordExpires: {
            [Op.gt]: Date.now(), // Valid token if not expired
          },
        },
      });

      if (!user) {
        return res
          .status(400)
          .json({ message: 'Password reset token is invalid or has expired.' });
      }

      // Compare the new password with the old hashed password
      const isSamePassword = await bcrypt.compare(password, user.password);
      if (isSamePassword) {
        return res.status(400).json({
          message: 'New password must be different from the previous password.',
        });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      await user.save();

      // Send email to the user after successful password reset
      const emailContent = generatePasswordResetEmail(user);
      sendEmail(user.email, 'Password Reset Confirmation!', emailContent);

      res.status(200).json({
        message: 'Your password has been successfully reset.',
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async changePassword(req, res) {
    const { oldPassword, newPassword } = req.body;
   console.log(req.body);
    // Ensure both passwords are provided
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: 'Both old and new passwords are required.' });
    }
    
    try {
      console.log(req.user)
      const user = await User.findByPk(req.userId)
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Compare the old password with the stored password
      const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isOldPasswordValid) {
        console.log('1');
        return res.status(400).json({ message: 'Old password is incorrect.' });
      }

      // Check if the new password is the same as the old one
      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      if (isSamePassword) {
        return res.status(400).json({ message: 'New password must be different from the old password.' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
     
      await user.save();
      res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = passwordController;
