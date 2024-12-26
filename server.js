require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path')
const authenticate = require('./src/middleware/auth'); // Import the middleware here


const app = express();
 // Use http.createServer
 // Initialize Socket.IO
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
  matchingListingRoutes,
  matchRequestRoutes
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
matchRequestRoutes(app);

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const clients = new Map();

wss.on('connection', (ws, req) => {
    const userId = req.url.split('/').pop(); // Extract userId from 
    console.log(req.url);
    console.log(`myUser connected: ${userId}`);
    clients.set(userId, ws);

    ws.on('message', (data) => {
        const message = JSON.parse(data);
        console.log(message);
        const recipientWs = clients.get(message.receiverUserID);
       
        

        if (recipientWs) {
            recipientWs.send(JSON.stringify(message)); // Send message to recipient
        } else {
            console.log(`Recipient not connected: ${message.receiverUserID}`);
        }
    });

    ws.on('close', () => {
        console.log(`User disconnected: ${userId}`);
        clients.delete(userId);
    });
});





const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}!`);
});
