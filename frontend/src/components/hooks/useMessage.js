// src/hooks/useMessages.js
import { useState, useEffect, useCallback } from 'react';
import { socket, sendMessage as socketSendMessage, getMessageHistory } from '../socket';

export const useMessages = (contactId) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get user ID from localStorage or use default
  const userId = localStorage.getItem('userId') || 'user';
  
  // Load initial messages from database via socket
  useEffect(() => {
    if (!contactId) return;
    
    setIsLoading(true);
    setMessages([]);
    
    // Set up socket event listeners
    const handleMessageHistory = (history) => {
      console.log('Received message history:', history);
      setMessages(history);
      setIsLoading(false);
    };
    
    const handleMessagesError = (errorMsg) => {
      console.error('Error loading messages:', errorMsg);
      setError('Failed to load messages. Please try again.');
      setIsLoading(false);
    };
    
    // Register event handlers
    socket.on('messageHistory', handleMessageHistory);
    socket.on('messagesError', handleMessagesError);
    
    // Request message history
    getMessageHistory(userId, contactId);
    
    // Clean up event listeners when component unmounts or contactId changes
    return () => {
      socket.off('messageHistory', handleMessageHistory);
      socket.off('messagesError', handleMessagesError);
    };
  }, [contactId, userId]);
  
  // Listen for new incoming messages via socket
  useEffect(() => {
    const handleReceiveMessage = (message) => {
      console.log('Received new message:', message);
      
      // Only add message if it's for this conversation
      if (
        (message.senderId === contactId && message.receiverId === userId) ||
        (message.senderId === userId && message.receiverId === contactId)
      ) {
        // Prevent duplicate messages by checking ID
        setMessages(prev => {
          // Check if message already exists in the array
          const exists = prev.some(m => m._id === message._id || m.id === message.id);
          if (exists) return prev;
          return [...prev, message];
        });
      }
    };
    
    const handleMessageSaved = (message) => {
      console.log('Message saved confirmation:', message);
      
      // Update the message in our state with the saved version
      setMessages(prev => {
        // Replace temporary ID with permanent one
        return prev.map(m => 
          (m.id === message.id || m._id === message._id) ? message : m
        );
      });
    };
    
    // Register event handlers
    socket.on('receiveMessage', handleReceiveMessage);
    socket.on('messageSaved', handleMessageSaved);
    
    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
      socket.off('messageSaved', handleMessageSaved);
    };
  }, [contactId, userId]);
  
  // Send a message function
  const sendMessage = (text) => {
    if (!contactId || !text) return;
    
    // If it's already a message object, use it as is
    if (typeof text === 'object') {
      // Already has all the properties we need
      socketSendMessage(text);
      return;
    }
    
    // Create a new message object
    const newMessage = {
      id: Date.now(), // Temporary client-side ID
      sender: 'user',
      senderId: userId,
      receiverId: contactId,
      text,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    
    // Add message to UI immediately (optimistic update)
    setMessages(prev => [...prev, newMessage]);
    
    // Send via socket
    socketSendMessage(newMessage);
    
    // For demo/testing: If this is a conversation with an AI assistant
    // Simulate the assistant typing and responding
    if (contactId === '5') { // Replace with your actual AI assistant ID
      setIsTyping(true);
      
      setTimeout(() => {
        setIsTyping(false);
        
        // Generate response based on message content
        const responseText = getAIResponse(text);
        
        const responseMessage = {
          id: Date.now() + 1,
          sender: 'contact',
          senderId: contactId,
          receiverId: userId,
          text: responseText,
          timestamp: new Date().toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })
        };
        
        // Add AI response to messages
        setMessages(prev => [...prev, responseMessage]);
        
        // Also send via socket to save in database
        socketSendMessage(responseMessage);
      }, 1500);
    }
  };
  
  // Refresh messages function
  const refreshMessages = useCallback(() => {
    if (contactId) {
      setIsLoading(true);
      getMessageHistory(userId, contactId);
    }
  }, [contactId, userId]);
  
  return { 
    messages, 
    sendMessage, 
    isTyping, 
    isLoading, 
    error,
    refreshMessages
  };
};

// Utility function for AI responses
const getAIResponse = (msg) => {
  const lowerMsg = msg.toLowerCase();
  
  if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
    return 'Hello! How can I help you today?';
  } else if (lowerMsg.includes('help')) {
    return 'I\'d be happy to help! What do you need assistance with?';
  } else if (lowerMsg.includes('thanks') || lowerMsg.includes('thank you')) {
    return 'You\'re welcome! Anything else you need?';
  } else if (lowerMsg.includes('bye')) {
    return 'Goodbye! Feel free to message me if you need anything else.';
  } else {
    return 'That\'s interesting! Can you tell me more about that?';
  }
};