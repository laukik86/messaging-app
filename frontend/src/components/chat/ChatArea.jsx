// File: src/components/chat/ChatArea.jsx
import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useMessages } from '../hooks/useMessage';

const ChatArea = ({ selectedContact, darkMode, updateContacts }) => {
  const { messages, sendMessage, isTyping } = useMessages(selectedContact.id);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    
    sendMessage(text);
    
    // Update last message in contact
    const updatedContact = {
      ...selectedContact,
      lastMessage: text
    };
    updateContacts(updatedContact);
  };

  return (
    <>
      <ChatHeader contact={selectedContact} darkMode={darkMode} />
      <MessageList 
        messages={messages} 
        isTyping={isTyping} 
        darkMode={darkMode} 
      />
      <MessageInput 
        onSendMessage={handleSendMessage} //here comes the input message from messageInput
        darkMode={darkMode} 
      />
    </>
  );
};

export default ChatArea;
