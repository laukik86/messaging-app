// src/socket.js
import { io } from 'socket.io-client';
const SOCKET_URL =  'http://localhost:3001';

//const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3001';

// Create socket instance
const socket = io(SOCKET_URL, {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Connection status tracking
let isConnected = false;

// Connection event handling
socket.on('connect', () => {
  console.log('✅ Connected to socket server');
  isConnected = true;
  
  // Get user ID from localStorage or generate a temporary one
  const userId = localStorage.getItem('userId') || 'user';
  
  // Register with the server
  socket.emit('register', userId);
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from socket server');
  isConnected = false;
});

socket.on('connect_error', (error) => {
  console.error('⚠️ Socket connection error:', error);
  isConnected = false;
});

// Helper functions
const sendMessage = (message) => {
  if (!isConnected) {
    console.warn('Socket not connected, cannot send message');
    return false;
  }
  
  socket.emit('sendMessage', message);
  return true;
};

const getMessageHistory = (userId, contactId) => {
  socket.emit('getMessages', { userId, contactId });
};

// Export socket and helper functions
export { socket, sendMessage, getMessageHistory };
export default socket;