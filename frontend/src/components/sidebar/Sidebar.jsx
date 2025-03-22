// File: src/components/sidebar/Sidebar.jsx
import React from 'react';
import SidebarHeader from './SidebarHeader';
import SearchBar from './SearchBar';
import ContactsList from './ContactsList';

const Sidebar = ({ contacts, selectedContact, onSelectContact, darkMode, toggleDarkMode }) => {
  return (
    <div className={`w-80 flex-shrink-0 border-r ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
      <SidebarHeader darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <SearchBar darkMode={darkMode} />
      <ContactsList 
        contacts={contacts}
        selectedContact={selectedContact}
        onSelectContact={onSelectContact}
        darkMode={darkMode}
      />
    </div>
  );
};

export default Sidebar;
