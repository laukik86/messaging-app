
// File: src/components/sidebar/ContactItem.jsx
import React from 'react';
import { User } from 'lucide-react';
import Avatar from '../common/Avatar';

const ContactItem = ({ contact, isSelected, onClick, darkMode }) => {
  return (
    <div
      onClick={onClick}
      className={`p-3 flex items-center cursor-pointer ${
        isSelected
          ? darkMode ? 'bg-gray-700' : 'bg-blue-50'
          : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
      }`}
    >
      <Avatar 
        src={contact.avatar} 
        name={contact.name} 
        status={contact.status} 
        darkMode={darkMode} 
      />
      <div className="ml-3 flex-grow">
        <div className="flex justify-between">
          <p className="font-medium text-sm">{contact.name}</p>
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{contact.lastSeen}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className={`text-xs truncate max-w-[180px] ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {contact.lastMessage}
          </p>
          {contact.unreadCount > 0 && (
            <span className="bg-blue-500 text-white px-2 rounded-full text-xs">{contact.unreadCount}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactItem;