
// File: src/components/chat/MessageList.jsx
import React, { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

const MessageList = ({ messages, isTyping, darkMode }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className={`flex-grow overflow-y-auto p-4 space-y-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {messages.map(msg => (
        <MessageBubble
          key={msg.id}
          message={msg}
          darkMode={darkMode}
        />
      ))}
      {isTyping && <TypingIndicator darkMode={darkMode} />}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
