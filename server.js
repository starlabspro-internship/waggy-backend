require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');

const app = express();

// Importing routes
const userRoutes = require('./src/routes/userRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const petRoutes = require('./src/routes/petRoutes');
const matchRoutes = require('./src/routes/matchRoutes');
const ratingRoutes = require('./src/routes/ratingRoutes');
const friendsRoutes = require('./src/routes/friendsRoutes');
const blogRoutes = require('./src/routes/blogRoutes');
const messagesRoutes = require('./src/routes/messagesRoutes');

// Middleware
app.use(express.json());
app.use(cors());

// Define routes
app.use('/api/users', userRoutes); // Changed to more RESTful endpoints
app.use('/api/profiles', profileRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/messages', messagesRoutes);

console.log('Routes registered:');
console.log('User Routes:', userRoutes.stack); // Displays registered routes for user
console.log('Profile Routes:', profileRoutes.stack);
console.log('Pet Routes:', petRoutes.stack);
console.log('Match Routes:', matchRoutes.stack);
console.log('Rating Routes:', ratingRoutes.stack);
console.log('Friends Routes:', friendsRoutes.stack);
console.log('Blog Routes:', blogRoutes.stack);
console.log('Messages Routes:', messagesRoutes.stack);

// Set the port
const port = process.env.PORT || 3000; // Default to 3000 if PORT is not set

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
