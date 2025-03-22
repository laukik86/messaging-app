
// File: src/components/chat/MessageInput.jsx
import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';

const MessageInput = ({ onSendMessage, darkMode }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    onSendMessage(message);
    setMessage('');
  };

  return (
    <div className={`p-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <button
          type="button"
          className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <Paperclip className="h-5 w-5" />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className={`flex-grow p-2 rounded-md ${
            darkMode
              ? 'bg-gray-700 text-white placeholder-gray-400 focus:outline-none'
              : 'bg-gray-100 focus:outline-none'
          }`}
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
