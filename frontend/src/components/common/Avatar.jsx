// File: src/components/common/Avatar.jsx
import React from 'react';
import { User } from 'lucide-react';

const Avatar = ({ src, name, status, darkMode, size = 'normal' }) => {
  const sizeClass = size === 'large' ? 'h-12 w-12' : 'h-10 w-10';
  const iconSize = size === 'large' ? 'h-8 w-8' : 'h-6 w-6';

  return (
    <div className="relative flex-shrink-0">
      {src ? (
        <img src={src} alt={name} className={`${sizeClass} rounded-full`} />
      ) : (
        <div className={`${sizeClass} rounded-full flex items-center justify-center ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
          <User className={iconSize} />
        </div>
      )}
      {status && (
        <span
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 ${
            darkMode ? 'border-gray-800' : 'border-white'
          } ${status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}
        />
      )}
    </div>
  );
};

export default Avatar;

