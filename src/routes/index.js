const userRoutes = require("./userRoutes");
const profileRoutes = require("./profileRoutes");
const friendsRoutes = require("./friendsRoutes");
const blogRoutes = require('./blogRoutes');
const messagesRoutes = require('./messagesRoutes');
const petsRoutes = require('./petRoutes'); // Add your pets routes
const ratingsRoutes = require('./ratingRoutes'); // Add your ratings routes
const matchesRoutes = require('./matchRoutes'); // Add your matches routes
const adoptionHistoryRoutes = require('./adoptionHistoryRoutes')
const adoptionListingRoutes = require('./adoptionListingsRoutes')
const adoptionRequestRoutes = require('./adoptionRequestRoutes')
const matchHistoryRoutes = require('./matchHistoryRoutes')
const passwordRoutes = require('./passwordRoutes')
const auth = require('./auth') // register,login, token, refresh token routes



module.exports = {
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
  passwordRoutes,
  auth
};
