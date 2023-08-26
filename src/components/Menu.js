import React, { useEffect, useState } from 'react';
import ShimmerCard from './ShimmerCard';

const Menu = () => {
  const [hotelDetails, setHotelDetails] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    let data = await fetch(`http://localhost:3000/hotel/68938`);
    console.log(typeof data);
    const jsonData = await data.json();
    setHotelDetails(jsonData);
  };

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
