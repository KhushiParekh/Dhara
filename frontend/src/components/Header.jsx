import React, { useEffect, useState } from 'react';
import {
  SosOutlined as SOSIcon,
  AccountCircleOutlined as ProfileIcon,
  Language as LanguageIcon,
} from '@mui/icons-material';

import { Menu, MenuItem, IconButton } from '@mui/material';
import '.././index.css';


function Header({ currentSection, onLanguageChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // const handleClose = (language) => {
  //   setAnchorEl(null);
  //   if (language) {
  //     onLanguageChange(language); // Pass selected language to parent
  //   }
  // };

  return (
    <header
      className="sticky top-0 bg-black text-white flex items-center p-4 z-10 border-b border-gray-800 text-md"
      style={{ height: '65.5px' }}
    >
      {/* Current Section Name */}
      <h2 className="text-xl font-bold text-green-700 pl-7">
        {currentSection || 'Dashboard'}
      </h2>

      {/* Spacer for alignment */}
      <div className="flex-grow"></div>

      {/* Left Section */}
      <div className="flex items-center space-x-4">
        <SOSIcon className="text-red-500 cursor-pointer" />

        {/* GTranslate Widget */}
        <div id="google_translate_element" className="text-white cursor-pointer"></div>

        {/* Multilingual Menu (optional) */}
        <LanguageIcon onClick={handleClick} className="text-white cursor-pointer" />
        {/* <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => handleClose()}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem onClick={() => handleClose('en')}>English</MenuItem>
          <MenuItem onClick={() => handleClose('hi')}>हिन्दी</MenuItem>
          <MenuItem onClick={() => handleClose('gu')}>ગુજરાતી</MenuItem>
          <MenuItem onClick={() => handleClose('mr')}>मराठी</MenuItem>
          <MenuItem onClick={() => handleClose('pa')}>ਪੰਜਾਬੀ</MenuItem>
          <MenuItem onClick={() => handleClose('as')}>অসমীয়া</MenuItem>
          <MenuItem onClick={() => handleClose('rj')}>राजस्थानी</MenuItem>
          <MenuItem onClick={() => handleClose('bh')}>भोजपुरी</MenuItem>
          <MenuItem onClick={() => handleClose('bn')}>বাংলা</MenuItem>
          <MenuItem onClick={() => handleClose('te')}>తెలుగు</MenuItem>
          <MenuItem onClick={() => handleClose('ta')}>தமிழ்</MenuItem>
          <MenuItem onClick={() => handleClose('kn')}>ಕನ್ನಡ</MenuItem>
          <MenuItem onClick={() => handleClose('or')}>ଓଡ଼ିଆ</MenuItem>
          <MenuItem onClick={() => handleClose('ml')}>മലയാളം</MenuItem>
          <MenuItem onClick={() => handleClose('ur')}>اردو</MenuItem>
          <MenuItem onClick={() => handleClose('ma')}>मैथिली</MenuItem>
        </Menu> */}
        <ProfileIcon className="text-green-700 cursor-pointer" />
      </div>
    </header>
  );
}

export default Header;