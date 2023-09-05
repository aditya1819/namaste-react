import React from 'react';
import MenuItemList from './MenuItemList';
import { useSelector } from 'react-redux';

const Cart = () => {
  // subscribing to store using selector
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="w-6/12 mx-auto shadow-lg bg-gray-50 p-4 my-4 ">
      <MenuItemList items={cartItems}></MenuItemList>
    </div>
  );
};

export default Cart;
