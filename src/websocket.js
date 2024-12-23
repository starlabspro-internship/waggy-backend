const { Server } = require('socket.io');
const messageController = require('./controllers/messagesControllerr'); 

module.exports = (server) => {
  // Initialize WebSocket server
  const io = new Server(server, {
    cors: {
      origin: '*', // Allow all origins (adjust as necessary for security)
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join a specific chat room
    socket.on('joinRoom', (chatRoomId) => {
      socket.join(chatRoomId.toString());
      console.log(`User joined chat room: ${chatRoomId}`);
    });

    // Handle sending messages
    socket.on('sendMessage', async (data) => {
      const { content, senderUserID, receiverUserID, chatRoomId } = data;

      try {
        // Save message to the database using the controller
        const newMessage = await messageController.createMessage(
          content,
          senderUserID,
          receiverUserID,
          chatRoomId
        );

        // Broadcast the message to all users in the chat room
        io.to(chatRoomId.toString()).emit('newMessage', {
          id: newMessage.messagesId,
          content: newMessage.content,
          senderUserID: newMessage.senderUserID,
          receiverUserID: newMessage.receiverUserID,
          sentAt: newMessage.sentAt,
          isRead: newMessage.isRead,
        });
      } catch (error) {
        console.error('Error saving message:', error);
        socket.emit('error', { message: 'Failed to send message' });
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io; // Return the WebSocket server instance (optional, for advanced use cases)
};
