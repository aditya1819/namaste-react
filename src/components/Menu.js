import React from 'react';
import ShimmerCard from './ShimmerCard';
import { useParams } from 'react-router-dom';
import useMenu from '../utils/hooks/useMenu';

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

  return (
    <div className="menu">
      <h1>{name}</h1>

      <h3>{cuisines.join(', ')}</h3>
      <h3>{cost}</h3>

      <h2>Menu</h2>

      <ul>
        {itemCards.map((item) => (
          <li key={item.card.info.id}>
            {item.card.info.name} -{' '}
            {item.card.info.price / 100 || item.card.info.defaultPrice / 100} Rs
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
