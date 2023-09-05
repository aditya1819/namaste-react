import React, { useState } from 'react';
import MenuItemList from './MenuItemList';

const MenuCategory = (props) => {
  const {
    data,
    items,
    showItems,
    setShowIndex,

    // to set index to null - in case of collapse
    setShowIndexNull
  } = props;

  const handleClick = () => {
    // to expand and collapse based on showItems value and onclick event
    showItems ? setShowIndexNull() : setShowIndex();
  };

  return (
    <div>
      <div className="w-6/12 mx-auto shadow-lg bg-gray-50 p-4 my-4 ">
        {/* header */}
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-medium text-xl">
            {data} ({items.length})
          </span>
          <span>⮟</span>
        </div>

        {/* body */}
        {showItems && <MenuItemList items={items} isMenuPage />}
      </div>
    </div>
  );
};

export default MenuCategory;
