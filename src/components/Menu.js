import React, { useState } from 'react';
import ShimmerCard from './ShimmerCard';
import { useParams } from 'react-router-dom';
import useMenu from '../utils/hooks/useMenu';
import MenuCategory from './MenuCategory';

const Menu = () => {
  // to access the dynamic param value of the route
  const { id } = useParams();

  // added custom hook to fetch menu based on id
  const hotelDetails = useMenu(id);

  // index of elements from category array
  const [showIndex, setShowIndex] = useState(0);

  if (hotelDetails === null) {
    return <ShimmerCard />;
  }

  const {
    name,
    cuisines,
    cost,
    city,
    cloudinaryImageId,
    areaName,
    avgRating,
    sla
  } = hotelDetails.info;

  const { foodOptions: itemCards } = hotelDetails ?? [];

  const categories = new Set([
    ...itemCards.map((item) => item.category ?? 'none')
  ]);

  return (
    <div className="text-center">
      <div className="font-bold my-8 text-3xl">{name}</div>

      <div className="text-xl font-medium text-gray-600">
        {cuisines.join(', ')}
        <h3>{cost}</h3>
      </div>

      {[...categories].map((category, index) => (
        <MenuCategory
          key={category}
          data={category}
          items={itemCards.filter((item) => item.category === category)}
          // parent component controlling states of the child
          // passing on set function is an example of state lifting
          showItems={showIndex === index ? true : false}
          setShowIndex={() => setShowIndex(index)}
          setShowIndexNull={() => setShowIndex(null)}
        />
      ))}
    </div>
  );
};

export default Menu;
