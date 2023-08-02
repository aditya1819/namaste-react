import React from 'react';
import constants from '../utils/constants';

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={constants.LOGO_URL} />
      </div>

      <div className="navbar">
        <ul>
          <li>Home</li>

          <li>About Us</li>
          <li>Contact</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
