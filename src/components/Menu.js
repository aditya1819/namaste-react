import React from 'react';
import ShimmerCard from './ShimmerCard';
import { useParams } from 'react-router-dom';
import useMenu from '../utils/hooks/useMenu';
import MenuCategory from './MenuCategory';

const Menu = () => {
  // to access the dynamic param value of the route
  const { id } = useParams();

  // added custom hook to fetch menu based on id
  const hotelDetails = useMenu(id);

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

      {[...categories].map((category) => (
        <MenuCategory
          data={category}
          items={itemCards.filter((item) => item.category === category)}
        />
      ))}
    </div>
  );
};

export default Menu;
