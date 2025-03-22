
// File: src/components/sidebar/SearchBar.jsx
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ darkMode }) => {
  return (
    <div className={`p-3 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className={`relative ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-md`}>
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search contacts..."
          className={`block w-full pl-10 pr-3 py-2 rounded-md text-sm ${
            darkMode ? 'bg-gray-700 text-gray-200 placeholder-gray-400' : 'bg-gray-100 text-gray-700 placeholder-gray-500'
          } focus:outline-none`}
        />
      </div>
    </div>
  );
};

export default SearchBar;

