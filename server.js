require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const { userRoutes, profileRoutes, friendsRoutes, blogRoutes, messagesRoutes } = require('./src/routes');

const petRoutes = require('./routes/petRoutes');
const matchRoutes = require('./routes/matchRoutes');
const ratingRoutes = require('./routes/ratingRoutes');

app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', profileRoutes);
app.use('/api', petRoutes);
app.use('/api', matchRoutes);
app.use('/api', ratingRoutes);
app.use('/api/friends', friendsRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/messages', messagesRoutes);

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
