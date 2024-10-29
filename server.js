const express = require('express');
const app = express();
const {userRoutes, profileRoutes} = require('./src/routes');


app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', profileRoutes);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
