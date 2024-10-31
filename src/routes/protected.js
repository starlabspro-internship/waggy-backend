const express = require('express');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId });
});

module.exports = router;
