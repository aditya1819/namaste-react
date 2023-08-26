import React from 'react';
import {Link} from 'react-router-dom'
import constants from '../utils/constants';

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={constants.LOGO_URL} />
      </div>

      <div className="navbar">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>

          <li>
            <Link to="/contact">Contact Us</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
