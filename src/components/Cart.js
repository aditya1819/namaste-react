import React from 'react';
import MenuItemList from './MenuItemList';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../utils/store/slice/cartSlice';

const Cart = () => {
  // subscribing to store using selector
  const cartItems = useSelector((store) => store.cart.items);

  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  let totalCost = 0;

  cartItems.forEach((item) => {
    const cost =
      item.data.card.info.price / 100 || item.data.card.info.defaultPrice / 100;
    totalCost += cost * item.count;
  });

  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-2xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto">
        <button
          className=" p-2 m-2 bg-black text-white rounded-lg"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        {cartItems?.length === 0 && (
          <h1> Cart is empty. Add Items to the cart!</h1>
        )}
        <MenuItemList items={cartItems} />
        {totalCost > 0 && (
          <div className="text-xl font-bold text-gray-600 text-left m-2 p-2">
            Total order cost: ₹ {totalCost}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
