import React, { useState, useEffect, useContext } from 'react';
import HotelContainer from './HotelContainer';
import useOnlineStatus from '../utils/hooks/useOnlineStatus';

const Body = () => {
  const [hotelList, setHotelList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  let hotelData;

  const filterHotelHandler = () => {
    const newHotelList = hotelList.filter((item) => {
      return parseInt(item.info.avgRating) >= 4;
    });

    setHotelList(newHotelList);
    setIsFilterApplied(true);
  };

  const clearFilterHandler = () => {
    fetchHotelList();
    setSearchQuery('');
    setIsFilterApplied(false);
  };

  const filterBySearchQuery = () => {
    if (searchQuery) {
      const newHotelList = hotelList.filter((item) => {
        return item.info.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setHotelList(newHotelList);
      setIsFilterApplied(true);
    }
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
      <div className="flex justify-between">
        <div className="w-10/12 flex ml-10 my-10 justify-center">
          <div>
            <input
              className="border-solid border-2 border-sky-500 p-2"
              id="search-input"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button
            className="text-white p-2 border-solid border-2 border-sky-500 bg-sky-300"
            onClick={filterBySearchQuery}
          >
            🔍
          </button>

          <button
            className=" bg-green-700 text-white rounded-lg p-2 mx-2"
            onClick={filterHotelHandler}
          >
            Top Rated ⭐
          </button>
        </div>
      </div>

      <div className="flex justify-center h-5">
        {isFilterApplied && (
          <div>
            <button
              className=" bg-slate-500 bg-opacity-50 text-white p-2"
              onClick={clearFilterHandler}
            >
              Clear Filter 🗙
            </button>
            {/* 
            <label className=" bg-gray-500 bg-opacity-30 text-slate-600 rounded-lg p-2 ml-10">
              {hotelList.length} Hotels found
            </label> */}
          </div>
        )}
      </div>

      {/* Here is the code to update context values on the go */}
      {/* <div className="username-bar">
          <input
          id="username-input"
          type="text"
            value={loggedInUser}
            onChange={(e) => setUserInfo(e.target.value)}
          />
        </div> */}

      <div className="w-10/12 mx-auto p-4 my-4">
        <HotelContainer hotelList={hotelList} />
      </div>
    </div>
  );
};

export default Body;
