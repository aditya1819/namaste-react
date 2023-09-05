import React, { useState, useEffect, useContext } from 'react';
import HotelContainer from './HotelContainer';
import useOnlineStatus from '../utils/hooks/useOnlineStatus';
import UserContext from '../utils/context/User';

const Body = () => {
  const [hotelList, setHotelList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  let hotelData;

  const { setUserInfo, loggedInUser } = useContext(UserContext);

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

  if (!useOnlineStatus()) {
    return (
      <h1>Looks like there is some issue with your internet connection</h1>
    );
  }

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

        <div className="username-bar">
          <input
            id="username-input"
            type="text"
            value={loggedInUser}
            onChange={(e) => setUserInfo(e.target.value)}
          />
        </div>
      </div>

      <HotelContainer hotelList={hotelList} />
    </div>
  );
};

export default Body;
