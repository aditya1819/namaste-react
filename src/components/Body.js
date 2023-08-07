import React, { useState, useEffect } from 'react';
import HotelCard from './HotelCard';

const Body = () => {
  const [hotelList, setHotelList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  let hotelData;

  const filterHotelHandler = () => {
    const newHotelList = hotelList.filter((item) => {
      return parseInt(item.info.avgRating) >= 4;
    });

    setHotelList(newHotelList);
  };

  const clearFilterHandler = () => {
    fetchHotelList();
    setSearchQuery('');
  };

  const filterBySearchQuery = () => {
    const newHotelList = hotelList.filter((item) => {
      return item.info.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setHotelList(newHotelList);
  };

  useEffect(() => {
    fetchHotelList();
  }, []);

  const fetchHotelList = async () => {
    try {
      data = await fetch('http://localhost:3000/hotels');
      const jsonData = await data.json();
      hotelData = jsonData;
      setHotelList(jsonData);
    } catch (error) {
      console.warn(error);
      setHotelList([]);
    }
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
        <div className="hotel-count">{hotelList.length} Hotels found</div>
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
