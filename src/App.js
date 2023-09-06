import React, { Suspense, lazy, useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/Header';
import Body from './components/Body';
import About from './components/About';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Error from './components/Error';
import Menu from './components/Menu';
import UserContext from './utils/context/User';
import { Provider } from 'react-redux';
import appStore from './utils/store/appStore';
import Cart from './components/Cart';

// Chunking | code spliting | Dynamic bundling | lazy loading | on demand loading

// Lazy loading of grocery module(js) when that component is accessed
// react provides lazy loading method which has a CB that takes path to the js component file
const Grocery = lazy(() => import('./components/Grocery'));

// Logic:
// When app renders a index file is loaded in the client browser
// that handles the application processing on server side
// as application grows this index file can get big in size putting a load on the client resources
// resulting in app getting bulky and slow
// with help of lazy loading application is splitted into modules
// these modules will be fetched in client browser when that component is loaded

const AppLayout = () => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    // make API call to fetch user data

    const data = {
      name: 'aditya shahare'
    };

    setUserInfo(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: 'Dummy Name' }}>
        <div className="AppLayout">
          <Header />

          {/* different context data for different components */}
          <UserContext.Provider value={{ loggedInUser: userInfo, setUserInfo }}>
            {/* while rendering the component corresponding to route will overrider the outlet in HTML */}
            <Outlet />
          </UserContext.Provider>
        </div>
      </UserContext.Provider>
    </Provider>
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
      { path: '/about', element: <About /> },
      {
        path: '/grocery',
        // fetching file takes sometime, meanwhile react is fast and keeps loading
        // it doesn't find the js so gives an error
        // Suspend wrapper help to provide a fallback JSX to render while the file is being fetched
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <Grocery />
          </Suspense>
        )
      },
      { path: '/hotels/:id', element: <Menu /> },
      { path: '/cart', element: <Cart /> }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<RouterProvider router={appRouter} />);
