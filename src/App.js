import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Error from './components/Error';

const AppLayout = () => {
  return (
    <div className="AppLayout">
      <Header />

      {/* while rendering the component corresponding to route will overrider the outlet in HTML */}
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    // these children routes will be rendered through outlet component
    children: [
      { path: '/', element: <Body /> },
      { path: '/about', element: <About /> }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);
