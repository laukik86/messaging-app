
// File: src/components/chat/ChatHeader.jsx
import React from 'react';
import { Search, MoreVertical } from 'lucide-react';
import Avatar from '../common/Avatar';

const ChatHeader = ({ contact, darkMode }) => {
  return (
    <div className={`p-4 flex items-center justify-between border-b ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center">
        <Avatar 
          src={contact.avatar} 
          name={contact.name} 
          status={contact.status} 
          darkMode={darkMode} 
        />
        <div className="ml-3">
          <h2 className="font-medium">{contact.name}</h2>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {contact.status === 'online' ? 'Online' : `Last seen ${contact.lastSeen}`}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Search className="h-5 w-5 cursor-pointer" />
        <MoreVertical className="h-5 w-5 cursor-pointer" />
      </div>
    </div>
  );
};

export default ChatHeader;
