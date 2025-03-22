
// File: src/components/chat/TypingIndicator.jsx
import React from 'react';

const TypingIndicator = ({ darkMode }) => {
  return (
    <div className="flex justify-start">
      <div className={`rounded-lg px-4 py-2 ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
        <div className="flex space-x-1">
          <div className={`h-2 w-2 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce`}></div>
          <div className={`h-2 w-2 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce delay-75`}></div>
          <div className={`h-2 w-2 rounded-full ${darkMode ? 'bg-gray-400' : 'bg-gray-500'} animate-bounce delay-150`}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
