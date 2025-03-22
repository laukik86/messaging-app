// // server.js (or your socket server file)
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');
// const { MongoClient, ObjectId } = require('mongodb');

// // MongoDB connection string
// const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
// const dbName = 'chat_app';

// // Create server
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// // Connect to MongoDB
// let db;
// async function connectToMongo() {
//   try {
//     const client = new MongoClient(mongoURI);
//     await client.connect();
//     console.log('Connected to MongoDB');
//     db = client.db(dbName);
    
//     // Create indexes for faster queries
//     await db.collection('messages').createIndex({ senderId: 1, receiverId: 1 });
//     await db.collection('messages').createIndex({ timestamp: 1 });
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
//   }
// }

// // Store active connections
// const activeUsers = new Map();

// // Socket connection handling
// io.on('connection', (socket) => {
//   console.log(`🔌 New client connected: ${socket.id}`);
  
//   // Handle user registration (map socket ID to user ID)
//   socket.on('register', (userId) => {
//     activeUsers.set(socket.id, userId);
//     console.log(`👤 User registered: ${userId} (Socket: ${socket.id})`);
    
//     // Join a room with their user ID for direct messaging
//     socket.join(userId);
//   });
  
//   // Handle sending messages
//   socket.on('sendMessage', async (message) => {
//     try {
//       console.log(`📩 Message received:`, message);
      
//       // Add server timestamp and generate MongoDB ID
//       const enhancedMessage = {
//         ...message,
//         _id: new ObjectId(),
//         server_timestamp: new Date(),
//         // If timestamp is missing, add it
//         timestamp: message.timestamp || new Date().toLocaleTimeString([], { 
//           hour: '2-digit', 
//           minute: '2-digit' 
//         })
//       };
      
//       // Save to MongoDB
//       if (db) {
//         await db.collection('messages').insertOne(enhancedMessage);
//         console.log(`💾 Message saved to database: ${enhancedMessage._id}`);
//       } else {
//         console.warn('⚠️ Database not connected, message not saved');
//       }
      
//       // Emit to recipient if online
//       if (message.receiverId) {
//         socket.to(message.receiverId).emit('receiveMessage', enhancedMessage);
//         console.log(`📤 Message sent to recipient: ${message.receiverId}`);
//       }
      
//       // Send confirmation back to sender with saved message
//       socket.emit('messageSaved', enhancedMessage);
//     } catch (err) {
//       console.error('❌ Error processing message:', err);
//       socket.emit('messageError', { 
//         messageId: message.id, 
//         error: 'Failed to process message' 
//       });
//     }
//   });
  
//   // Get conversation history
//   socket.on('getMessages', async ({ userId, contactId }) => {
//     try {
//       if (!db) {
//         socket.emit('messagesError', 'Database not connected');
//         return;
//       }
      
//       const messages = await db.collection('messages').find({
//         $or: [
//           { senderId: userId, receiverId: contactId },
//           { senderId: contactId, receiverId: userId }
//         ]
//       })
//       .sort({ timestamp: 1 })
//       .toArray();
      
//       socket.emit('messageHistory', messages);
//     } catch (err) {
//       console.error('Error fetching messages:', err);
//       socket.emit('messagesError', 'Failed to fetch messages');
//     }
//   });
  
//   socket.on('disconnect', () => {
//     const userId = activeUsers.get(socket.id);
//     if (userId) {
//       console.log(`👋 User disconnected: ${userId} (Socket: ${socket.id})`);
//       activeUsers.delete(socket.id);
//     } else {
//       console.log(`🔌 Client disconnected: ${socket.id}`);
//     }
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 3001;
// async function startServer() {
//   await connectToMongo();
  
//   server.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//   });
// }

// startServer().catch(console.error);