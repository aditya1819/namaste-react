import React from 'react';
import HotelCard from './HotelCard';
import mock from '../utils/mock';

const Body = () => {
  return (
    <div className="body">
      <div className="search">Search Bar here</div>
      <div className="hotel-container">
        {mock.map((item) => {
          return <HotelCard data={item.info} />;
        })}
      </div>
    </div>
  );
};

export default Body;
