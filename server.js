//require('dotenv').config(); // Load environment variables from .env file
const express = require('express');

const cors = require('cors');




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
  matchHistoryRoutes , 
  passwordRoutes
} = require('./src/routes/index');


const app = express();
app.use(cors());
app.use(express.json());


userRoutes(app)
profileRoutes(app); 
friendsRoutes(app);
blogRoutes(app);
messagesRoutes(app);
petsRoutes(app);
ratingsRoutes(app);
matchesRoutes(app);
adoptionHistoryRoutes(app)
adoptionHistoryRoutes(app)
adoptionListingRoutes(app)
adoptionRequestRoutes(app)
matchHistoryRoutes(app)
passwordRoutes(app)

const port = process.env.PORT || 3000; 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Welcome to the Waggy API');
});
