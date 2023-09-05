import React from 'react';
import constants from '../utils/constants';

const HotelCard = (props) => {
  const { data } = props;
  const { name, avgRating, cuisines, sla, cloudinaryImageId } = data;

  return (
    <div className="hotel-card">
      <img className="hotel-logo" src={constants.CDN_URL + cloudinaryImageId} />
      <h3>{name}</h3>
      <br />
      {/* <h4>{props.cuisine}</h4> */}
      <h4>{avgRating} stars</h4>
      <h4>{cuisines.join()}</h4>
      <h4>{sla.deliveryTime} min</h4>
    </div>
  );
};

// Higher order component
export const withOfferLable = (HotelCard) => {
  return (props) => {
    const { data } = props;
    const { offerLabel } = data;
    return (
      <div>
        <label className="absolute  text-white ml-12 mt-2 rounded-lg p-2 font-semibold text-l bg-slate-800">
          {offerLabel}
        </label>
        <HotelCard {...props} />
      </div>
    );
  };
};

export default HotelCard;
