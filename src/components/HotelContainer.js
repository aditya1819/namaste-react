import React from 'react';
import HotelCard from './HotelCard';
import ShimmerCard from './ShimmerCard';

const HotelContainer = (props) => {
  const { hotelList } = props;

  if (hotelList.length === 0) {
    return <ShimmerCard />;
  }

  return (
    <div className="hotel-container">
      {hotelList.map((item) => {
        return <HotelCard key={item.info.id} data={item.info} />;
      })}
    </div>
  );
};

export default HotelContainer;
