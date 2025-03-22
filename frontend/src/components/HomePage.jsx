import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar/sidebar';
import ChatArea from './chat/ChatArea';
import WelcomeScreen from './chat/WelcomeScreen';
import { useDarkMode } from './hooks/useDarkMode';
import socket from './socket';

const HomePage = () => {
  const [darkMode, setDarkMode] = useDarkMode();
  const [selectedContact, setSelectedContact] = useState(null);
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Sarah Johnson', status: 'online', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', lastMessage: 'Sure, let me know when!', unreadCount: 3, lastSeen: 'Just now' },
    { id: 2, name: 'Michael Chen', status: 'online', avatar: 'https://via.placeholder.com/40', lastMessage: 'The meeting is at 3pm', unreadCount: 0, lastSeen: '5m ago' },
    { id: 3, name: 'Alex Williams', status: 'offline', avatar: 'https://via.placeholder.com/40', lastMessage: 'Thanks for your help!', unreadCount: 0, lastSeen: '1h ago' },
    { id: 4, name: 'Jessica Miller', status: 'online', avatar: 'https://via.placeholder.com/40', lastMessage: 'Did you see the latest report?', unreadCount: 2, lastSeen: '30m ago' },
    { id: 5, name: 'AI Assistant', status: 'online', avatar: 'https://via.placeholder.com/40', lastMessage: 'Heyy matee', unreadCount: 0, lastSeen: 'Always online' },
  ]);

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setContacts(prevContacts =>
        prevContacts.map(c =>
          c.id === message.senderId  
            ? { ...c, lastMessage: message.text, unreadCount: c.unreadCount + 1 }  
            : c
        )
      );
    });

    return () => socket.off("receiveMessage");
  }, []);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setContacts(prevContacts => 
      prevContacts.map(c => 
        c.id === contact.id ? { ...c, unreadCount: 0 } : c
      )
    );
  };

  return (
    <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-gray-100'}`}>
      {/* Sidebar */}
      <Sidebar 
        contacts={contacts}
        selectedContact={selectedContact}
        onSelectContact={handleContactSelect}
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
      />
      
      {/* Main Chat Area */}
      <div className="flex-grow flex flex-col">
        {selectedContact ? (
          <ChatArea 
            selectedContact={selectedContact}
            darkMode={darkMode}
            updateContacts={(updatedContact) => {
              setContacts(prevContacts => 
                prevContacts.map(c => 
                  c.id === updatedContact.id ? updatedContact : c
                )
              );
            }}
          />
        ) : (
          <WelcomeScreen 
            contacts={contacts.slice(0, 3)} 
            onSelectContact={handleContactSelect}
            darkMode={darkMode}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
