
// File: src/components/sidebar/SidebarHeader.jsx
import React from 'react';
import { Menu, Bell, Moon, Sun } from 'lucide-react';

const SidebarHeader = ({ darkMode, toggleDarkMode }) => {
  return (
    <div className={`p-4 flex items-center justify-between border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="flex items-center space-x-2">
        <Menu className="h-6 w-6" />
        <h1 className="font-semibold text-xl">Messages</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Bell className="h-5 w-5 cursor-pointer" />
        <button onClick={toggleDarkMode} className="p-1 rounded-full">
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>
    </div>
  );
};

export default SidebarHeader;
