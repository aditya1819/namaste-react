import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import constants from '../utils/constants';
import useOnlineStatus from '../utils/hooks/useOnlineStatus';
import UserContext from '../utils/context/User';

const Header = () => {
  const data = useContext(UserContext);

  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={constants.LOGO_URL} />
      </div>

      <div className="navbar">
        <ul>
          <li>
            {data.loggedInUser}'s Status: {useOnlineStatus() ? '🟢' : '🔴'}
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/grocery">Grocery</Link>
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
