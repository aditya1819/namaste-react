import React from 'react';
import HotelCard from './HotelCard';
import mock from '../utils/mock';

const Body = () => {
  return (
    <div className="body">
      <div className="search">Search Bar here</div>
      <div className="hotel-container">
        {mock.map((item) => {
          return <HotelCard key={item.info.id} data={item.info} />;
        })}
      </div>
    </div>
  );
};

export default Body;
