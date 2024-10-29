require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const {userRoutes, profileRoutes} = require('./src/routes');



app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', profileRoutes);


const port = process.env.PORT

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
