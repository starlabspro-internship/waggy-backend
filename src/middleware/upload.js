const multer = require('multer');
const path = require('path');

// Configure storage settings for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify folder to save images
  },
  filename: (req, file, cb) => {
    // Create a unique filename based on timestamp
    cb(null, Date.now() + path.extname(file.originalname)); // e.g. 1616162161655.jpg
  },
});

// Filter to accept only image files
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Initialize multer with the storage configuration
const upload = multer({ storage, fileFilter });

module.exports = upload;
