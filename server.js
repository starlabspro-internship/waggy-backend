require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const {userRoutes, profileRoutes} = require('./src/routes');

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

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
