const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const generateForgotPasswordEmail = require('../template/forgotPasswordTemplate')

const passwordService = {
  async generateResetToken(email) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPassword = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();
    
    return token;
  },

  async sendResetEmail(email, token) {
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_PROVIDER,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetUrl = `http://localhost:3000/reset/${token}`;
    const emailContent = generateForgotPasswordEmail(resetUrl); // Use the template

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      html: emailContent, // Use the generated HTML content
    };

    await transporter.sendMail(mailOptions);
  },
};

module.exports = passwordService;