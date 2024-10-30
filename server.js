require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');


// const registerUserRoutes = require('./src/routes/userRoutes');
// const registerProfileRoutes = require('./src/routes/profileRoutes');
// const registerRatingRoutes = require('./src/routes/ratingRoutes');
// const registerPetRoutes = require('./src/routes/petRoutes');
// const registerMessagesRoutes = require('./src/routes/messagesRoutes');
// const registerMatchRoutes = require('./src/routes/matchRoutes');
// const registerFriendsRoutes = require('./src/routes/friendsRoutes');
// const registerBlogRoutes = require('./src/routes/blogRoutes');
// const adoptionHistoryRoutes = require('./src/routes/adoptionHistoryRoutes')
// const adoptionListingsRoutes = require('./src/routes/adoptionListingsRoutes')
// const adoptionRequestRoutes = require('./src/routes/adoptionRequestRoutes')
// const matchHistoryRoutes = require('./src/routes/matchHistoryRoutes')

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
  matchHistoryRoutes 
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

const port = process.env.PORT || 3000; 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
