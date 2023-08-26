import React from 'react';
import constants from '../utils/constants';

const HotelCard = (props) => {
  const { data } = props;
  const { name, avgRating, cuisines, sla, cloudinaryImageId } = data;
  // const { name } = item?.info
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

export default HotelCard;
