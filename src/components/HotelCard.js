import React from 'react';
import constants from '../utils/constants';

const HotelCard = (props) => {
  const { data } = props;
  const { name, avgRating, cuisines, sla, cloudinaryImageId } = data;

  return (
    <div className="w-64 m-6 overflow-hidden shadow-lg hover:shadow-2xl">
      <img
        className="block bg-cover h-40 w-full"
        src={constants.CDN_URL + cloudinaryImageId}
      />
      <div className="text-xl p-2 font-semibold h-10">{name}</div>
      <br />

      <div className="px-2 py-8 my-2">
        <span>{avgRating} stars</span>

        <h4></h4>
        <h4>{cuisines.slice(0, 2).join()}</h4>
        <div className=" text-gray-800 italic">{sla.deliveryTime} min</div>
      </div>
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
        <label className="absolute  text-white ml-8 mt-2 rounded-lg p-2 font-semibold text-l bg-slate-800 bg-opacity-75">
          {offerLabel}
        </label>
        <HotelCard {...props} />
      </div>
    );
  };
};

export default HotelCard;
