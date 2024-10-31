require('dotenv').config();
const express = require('express');
const cors = require('cors');
const protectedRoutes = require('./src/routes/protected');
const authRoutes = require('./src/routes/auth');
const authenticate = require('./src/middleware/auth'); // Import the middleware here

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Authentication Routes
app.use('/auth', authRoutes);

// Protected Routes
app.use('/api/protected', authenticate, protectedRoutes);

// Other routes (if they are defined correctly in your index file)
const {
  userRoutes,
  profileRoutes,
  friendsRoutes,
  blogRoutes,
  messagesRoutes,
  petsRoutes,
  ratingsRoutes,
  matchesRoutes,
  adoptionHistoryRoutes,
  adoptionListingRoutes,
  adoptionRequestRoutes,
  matchHistoryRoutes,
} = require('./src/routes/index');

userRoutes(app);
profileRoutes(app);
friendsRoutes(app);
blogRoutes(app);
messagesRoutes(app);
petsRoutes(app);
ratingsRoutes(app);
matchesRoutes(app);
adoptionHistoryRoutes(app);
adoptionListingRoutes(app);
adoptionRequestRoutes(app);
matchHistoryRoutes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
