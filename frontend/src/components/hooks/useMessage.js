
// File: src/hooks/useMessages.js
import { useState, useEffect } from 'react';

// Sample messages data for demo
const sampleMessages = {
  1: [
    { id: 1, sender: 'contact', text: 'Hey there! How are you doing?', timestamp: '10:30 AM' },
    { id: 2, sender: 'user', text: 'I\'m good! Just working on this project.', timestamp: '10:32 AM' },
    { id: 3, sender: 'contact', text: 'Nice! What project are you working on?', timestamp: '10:33 AM' },
    { id: 4, sender: 'user', text: 'Building a messaging dashboard with React and TailwindCSS.', timestamp: '10:35 AM' },
    { id: 5, sender: 'contact', text: 'That sounds cool! Let me know when you finish it.', timestamp: '10:36 AM' },
    { id: 6, sender: 'user', text: 'Sure, will do!', timestamp: '10:38 AM' },
    { id: 7, sender: 'contact', text: 'Sure, let me know when!', timestamp: '10:40 AM' },
  ],
  5: [
    { id: 1, sender: 'contact', text: 'Hello! I\'m your AI assistant. How can I help you today?', timestamp: '11:00 AM' },
    { id: 2, sender: 'user', text: 'I need help with my project', timestamp: '11:02 AM' },
    { id: 3, sender: 'contact', text: 'I\'d be happy to help! What kind of project are you working on?', timestamp: '11:02 AM' },
  ]
};

export const useMessages = (contactId) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Load messages for selected contact
    setMessages(sampleMessages[contactId] || []);
  }, [contactId]);

  const sendMessage = (text) => {
    const newMessage = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newMessage]);
    
    // Simulate typing and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      // Generate response based on message content
      const responseText = getAIResponse(text, contactId);
      
      const responseMessage = {
        id: Date.now() + 1,
        sender: 'contact',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 2000);
  };

  return { messages, sendMessage, isTyping };
};

// Utility function for AI responses
const getAIResponse = (msg, contactId) => {
  // AI Assistant responses
  if (contactId === 5) {
    const lowerMsg = msg.toLowerCase();
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return 'Hello there! How can I assist you today?';
    } else if (lowerMsg.includes('help')) {
      return 'I\'d be happy to help! What do you need assistance with?';
    } else if (lowerMsg.includes('thanks') || lowerMsg.includes('thank you')) {
      return 'You\'re welcome! Is there anything else you need?';
    } else if (lowerMsg.includes('weather')) {
      return 'I don\'t have access to real-time weather data, but I can help with other questions!';
    } else if (lowerMsg.includes('name')) {
      return 'I\'m your AI assistant. You can call me Assistant!';
    } else if (lowerMsg.includes('project')) {
      return 'Your messaging project sounds interesting! Need any specific development advice?';
    } else if (lowerMsg.includes('bye')) {
      return 'Goodbye! Feel free to message me anytime you need assistance.';
    } else if (lowerMsg.includes('feature')) {
      return 'Some cool features for messaging apps include read receipts, reactions, and file sharing!';
    } else if (lowerMsg.includes('time')) {
      return `The current time is ${new Date().toLocaleTimeString()}.`;
    } else {
      return 'That\'s interesting! Can you tell me more about that?';
    }
  } 
  // Regular contact responses
  else {
    return "Thanks for your message! I'll get back to you soon.";
  }
};