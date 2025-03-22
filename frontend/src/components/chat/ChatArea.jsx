import React from 'react';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { useMessages } from '../hooks/useMessage';

const ChatArea = ({ selectedContact, darkMode }) => {
  // Get the messages and related functions from our hook
  const { 
    messages, 
    sendMessage, 
    isTyping, 
    isLoading, 
    error 
  } = useMessages(selectedContact.id);

  const handleSendMessage = (text) => {
    if (!text.trim()) return;
    sendMessage(text);
  };

  return (
    <div className="flex flex-col h-full">
      <ChatHeader contact={selectedContact} darkMode={darkMode} />
      
      {error && (
        <div className={`p-2 text-center ${darkMode ? 'bg-red-900 text-white' : 'bg-red-100 text-red-700'}`}>
          {error}
        </div>
      )}
      
      <MessageList 
        messages={messages} 
        isTyping={isTyping} 
        isLoading={isLoading}
        darkMode={darkMode} 
      />
      
      <MessageInput 
        onSendMessage={handleSendMessage} 
        darkMode={darkMode} 
      />
    </div>
  );
};

export default ChatArea;