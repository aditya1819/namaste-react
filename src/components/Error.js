import React from 'react';
import { useRouteError } from 'react-router-dom';

const Error = () => {
  const err = useRouteError();
  return (
    <div className="text-center p-4 m-4 text-xl font-bold">
      Oops...
      <div className="text-gray-500 italic">
        Something went wrong
        <br />
        {err.status}: {err.statusText}
      </div>
    </div>
  );
};

export default Error;
