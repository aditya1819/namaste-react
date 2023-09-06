import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import constants from '../utils/constants';
import UserContext from '../utils/context/User';
import { useSelector } from 'react-redux';

const Header = () => {
  // subscribing to store using selector
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);

  return (
    <div className="border-2 border-b-gray-400">
      <div className="flex justify-between">
        <div className="w-1/12">
          <img src={constants.LOGO_URL} />
        </div>

        <div className="5/12  text-gray-800 text-lg font-medium">
          <div className="flex">
            <div className="p-2 py-10 m-2">
              <Link to="/">Home</Link>
            </div>

            <div className="p-2 py-10 m-2">
              <Link to="/about">About Us</Link>
            </div>
            <div className="p-2 py-10 m-2">
              <Link to="/contact">Contact Us</Link>
            </div>
            <div className="p-2 py-10 m-2">
              <Link to="/grocery">Grocery</Link>
            </div>
            <div className="p-2 py-10 m-2">
              <Link to="/cart">Cart 🛒 ({cartItems.length})</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
