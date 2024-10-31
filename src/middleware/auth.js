const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Extract the token from the Authorization header
  const token = req.header('Authorization')?.split(' ')[1];

  // Check if the token is provided
  if (!token) return res.status(401).json({ error: 'No token provided' });

  // Verify the token using your secret
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    // Handle token verification errors
    if (err) return res.status(403).json({ error: 'Invalid token' });

    // Attach the decoded user ID to the request object
    req.userId = decoded.id;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = authMiddleware;
