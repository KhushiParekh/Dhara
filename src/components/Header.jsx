
import React from 'react';
import { SosOutlined as SOSIcon, AccountCircleOutlined as ProfileIcon } from '@mui/icons-material';

function Header({ selectedSection }) {
  return (
    <header className="sticky top-0 w-full bg-black text-white flex items-center justify-between p-5 z-10 border-b border-gray-800">
      {/* Left Side Icons */}
      <div className="flex items-center space-x-4">
        <SOSIcon className="text-red-500 cursor-pointer" />
        <ProfileIcon className="text-green-500 cursor-pointer" />
      </div>

      {/* Center Section Name */}
      <h2 className="text-xl font-bold text-green-500">{selectedSection}</h2>

      {/* Placeholder for right-side elements */}
      <div className="w-10" />
    </header>
  );
}

export default Header;
