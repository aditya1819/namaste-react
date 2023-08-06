import React, { useState } from 'react';
import HotelCard from './HotelCard';
import mock from '../utils/mock';

const Body = () => {
  const [hotelList, setHotelList] = useState(mock);
  const [searchQuery, setSearchQuery] = useState('');

  const filterHotelHandler = () => {
    const newHotelList = hotelList.filter((item) => {
      console.log(parseInt(item.info.avgRating));
      return parseInt(item.info.avgRating) >= 4;
    });

    setHotelList(newHotelList);
  };

  const clearFilterHandler = () => {
    setHotelList(mock);
    setSearchQuery('');
  };

  const filterBySearchQuery = () => {
    const newHotelList = mock.filter((item) => {
      console.log(item);
      return item.info.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setHotelList(newHotelList);
  };

  return (
    <div className="body">
      <div className="btns">
        <div className="search-bar">
          <input
            id="search-input"
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="search-btn" onClick={filterBySearchQuery}>
          Search 🔍
        </div>
        <div className="filter-btn" onClick={filterHotelHandler}>
          Top Rated ⭐
        </div>
        <div className="clear-filter-btn" onClick={clearFilterHandler}>
          Clear Filter 🗙
        </div>
      </div>
      <div className="hotel-container">
        {hotelList.map((item) => {
          return <HotelCard key={item.info.id} data={item.info} />;
        })}
      </div>
    </div>
  );
};

export default Body;
