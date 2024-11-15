require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path')
const authenticate = require('./src/middleware/auth'); // Import the middleware here
const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Protected Routes
app.get('/api/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'Protected route accessed' });
});

// Other routes (if they are defined correctly in your index file)
const {
  userRoutes,
  profileRoutes,
  passwordRoutes,
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
  auth,
  matchingListingRoutes
} = require('./src/routes/index');

app.use(cors());
app.use(express.json());

// Protected Routes
app.get('/api/protected', authenticate, (req, res) => {
  res.status(200).json({ message: 'Protected route accessed' });
});


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
auth(app);
passwordRoutes(app);
matchingListingRoutes(app);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}!`);
});
