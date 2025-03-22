import React, { useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useMessages } from '../hooks/useMessage';
import socket from "../socket";

const ChatArea = ({ selectedContact, darkMode }) => {
  // Custom hook for managing messages
  const { messages, sendMessage, isTyping } = useMessages(selectedContact.id);
  
  useEffect(() => {
    const handleMessage = (message) => {
      // Only add the message if it's from the selected contact
      if (message.sender === 'contact' && message.contactId === selectedContact.id) {
        // Pass the entire message object
        sendMessage(message);
      }
    };
  
    socket.on("receiveMessage", handleMessage);
    return () => socket.off("receiveMessage", handleMessage);
  }, [selectedContact.id, sendMessage]);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    
    // No need to create a message object here
    // Your hook's sendMessage already creates the message object
    sendMessage(text);
    
    // If you need to emit to socket, create a compatible object
    const socketMessage = {
      id: Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    socket.emit("sendMessage", socketMessage);
  };

  return (
    <>
      <ChatHeader contact={selectedContact} darkMode={darkMode} />
      <MessageList messages={messages} isTyping={isTyping} darkMode={darkMode} />
      <MessageInput onSendMessage={handleSendMessage} darkMode={darkMode} />
    </>
  );
};

export default ChatArea;