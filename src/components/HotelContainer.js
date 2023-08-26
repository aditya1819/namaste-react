import React from 'react';
import HotelCard from './HotelCard';
import ShimmerCard from './ShimmerCard';
import { Link } from 'react-router-dom';

const HotelContainer = (props) => {
  const { hotelList } = props;

  if (hotelList.length === 0) {
    return <ShimmerCard />;
  }

  return (
    <div className="hotel-container">
      {hotelList.map((item) => {
        return (
          <Link key={item.info.id} to={'hotels/' + item.info.id}>
            <HotelCard data={item.info} />
          </Link>
        );
      })}
    </div>
  );
};

export default HotelContainer;
