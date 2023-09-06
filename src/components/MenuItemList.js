import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../utils/store/slice/cartSlice';

const MenuItemList = ({ items, isMenuPage }) => {
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    // dispatch an action to the redux store

    dispatch(addItem(item));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const countMap = new Map();

  if (!isMenuPage) {
    items = items.map((item) => {
      countMap.set(item.data.card.info.id, item.count);

      return item.data;
    });
  }

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-b-2 border-gray-200 text-left flex justify-between"
        >
          <div className="w-9/12">
            <div className="py-2">
              <span className="text-lg">{item.card.info.name}</span>
              <span>
                - ₹{' '}
                {item.card.info.price / 100 ||
                  item.card.info.defaultPrice / 100}
              </span>
            </div>

            <div className="text-xs">
              <p>{item.card.info.description}</p>
            </div>
          </div>

          <div className="w-3/12">
            <div className="absolute">
              {isMenuPage ? (
                <button
                  className="p-2 rounded-lg m-1 bg-green-100 shadow-lg"
                  onClick={() => {
                    handleAddItem(item);
                  }}
                >
                  Add +
                </button>
              ) : (
                <div className="flex">
                  <div className="p-2 rounded-lg m-1 bg-teal-200 shadow-lg font-bold">
                    {countMap.get(item.card.info.id)}
                  </div>
                  <button
                    className="p-2 rounded-lg m-1 bg-red-100 shadow-lg"
                    onClick={() => {
                      handleRemoveItem(item.card.info.id);
                    }}
                  >
                    🗙
                  </button>
                </div>
              )}
            </div>

            {item.card.info.imageId ? (
              <img
                src={constants.CDN_URL + item.card.info.imageId}
                className="w-full"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuItemList;
