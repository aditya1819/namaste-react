import React from 'react';
import HotelCard, { withOfferLable } from './HotelCard';
import ShimmerCard from './ShimmerCard';
import { Link } from 'react-router-dom';

const HotelContainer = (props) => {
  const { hotelList } = props;

  if (hotelList.length === 0) {
    return <ShimmerCard />;
  }

  const HotelCardOffer = withOfferLable(HotelCard);

  return (
    <div className="hotel-container">
      {hotelList.map((item) => (
        <Link key={item.info.id} to={'hotels/' + item.info.id}>
          {item.info.offerLabel ? (
            <HotelCardOffer data={item.info} />
          ) : (
            <HotelCard data={item.info} />
          )}
        </Link>
      ))}
    </div>
  );
};

export default HotelContainer;
