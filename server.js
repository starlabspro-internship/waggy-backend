require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');


const registerUserRoutes = require('./src/routes/userRoutes');
const registerProfileRoutes = require('./src/routes/profileRoutes');
const registerRatingRoutes = require('./src/routes/ratingRoutes');
const registerPetRoutes = require('./src/routes/petRoutes');
const registerMessagesRoutes = require('./src/routes/messagesRoutes');
const registerMatchRoutes = require('./src/routes/matchRoutes');
const registerFriendsRoutes = require('./src/routes/friendsRoutes');
const registerBlogRoutes = require('./src/routes/blogRoutes');

const app = express();

registerUserRoutes(app)
registerProfileRoutes(app); 
registerRatingRoutes(app);
registerBlogRoutes(app);
registerFriendsRoutes(app);
registerMatchRoutes(app);
registerMessagesRoutes(app);
registerPetRoutes(app);
const port = process.env.PORT || 3000; 

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
