
// File: src/components/chat/WelcomeScreen.jsx
import React from 'react';
import { User } from 'lucide-react';
import Avatar from '../common/Avatar';

const WelcomeScreen = ({ contacts, onSelectContact, darkMode }) => {
  return (
    <div className={`flex-grow flex flex-col items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`p-8 rounded-lg text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} max-w-md`}>
        <h2 className="text-2xl font-bold mb-4">Welcome to your Messaging Dashboard</h2>
        <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Select a contact from the list to start chatting
        </p>
        <div className="flex justify-center space-x-4">
          {contacts.map(contact => (
            <div 
              key={contact.id}
              onClick={() => onSelectContact(contact)}
              className="cursor-pointer"
            >
              <div className="relative mx-auto">
                <Avatar 
                  src={contact.avatar} 
                  name={contact.name} 
                  status={contact.status} 
                  size="large"
                  darkMode={darkMode} 
                />
              </div>
              <p className="text-xs mt-1 text-center">{contact.name.split(' ')[0]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;