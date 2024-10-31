// emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config(); 

// Create a transporter object
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_PROVIDER, 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS  
  }
});

// Send an email
const sendEmail = (to, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, 
    to,
    subject,
    html: htmlContent
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email: ', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
};

module.exports = sendEmail;
