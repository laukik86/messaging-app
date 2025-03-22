// File: src/components/chat/ChatArea.jsx
import React, { useState, useEffect } from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useMessages } from '../hooks/useMessage';
import socket from "../socket";

const ChatArea = ({ selectedContact, darkMode, updateContacts }) => {
  const { messages, sendMessage, isTyping } = useMessages(selectedContact.id);

  useEffect(() => {
    socket.on("reciveMessage",(message)=>{
      if(message.senderId === selectedContact.id || message.senderId==="user"){
        setMessages(prev=>[...prev,message]);
      }
    });

    return()=>socket.off("reciveMessage");
  },[selectedContact.id]);

  const handleSendMessage = (text) => {
    if(!text) return;

    const message={
      senderId:"user",
      receiverId:selectedContact.id,
      text,
      timestamp: new Date().toLocaleDateString()
    };
    setMessage(prev=>[...prev,message]);
    socket.emit("sendMessage",message);
  };

  return (
    <>
      <ChatHeader contact={selectedContact} darkMode={darkMode} />
      <MessageList 
        messages={messages} 
        
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
