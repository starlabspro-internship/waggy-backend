
const express = require('express');


const userRoutes = require("./userRoutes");
const profileRoutes = require("./profileRoutes");
const friendsRoutes = require("./friendsRoutes");
const blogRoutes = require('./blogRoutes');
const messagesRoutes = require('./messagesRoutes');
const petsRoutes = require('./petsRoutes'); // Add your pets routes
const ratingsRoutes = require('./ratingsRoutes'); // Add your ratings routes
const matchesRoutes = require('./matchesRoutes'); // Add your matches routes

module.exports = {
  userRoutes,
  profileRoutes,
  friendsRoutes,
  blogRoutes,
  messagesRoutes,
  petsRoutes,
  ratingsRoutes,
  matchesRoutes
};
