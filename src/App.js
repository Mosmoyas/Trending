import jwtDecode from 'jwt-decode';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import { Layout, Home, About, Movies, Tv, People, Register, Login, Profile, ProtectedRoute } from './Components/index';
import { useState, useEffect } from 'react';
import { ItemDetails } from './Container/index.js';
import { Offline, Online } from 'react-detect-offline';

function App() {

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData();
    }
  }, [])


  const [userData, setuserData] = useState(null);

  function saveUserData() {

    let endcodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(endcodedToken);
    setuserData(decodedToken);
  }


  let routers = createBrowserRouter([
    {
      path: '/', element: <Layout userData={userData} setuserData={setuserData} />, children: [
        { index: true, element: <ProtectedRoute><Home userData={userData} /> </ProtectedRoute> },
        { path: 'about', element: <ProtectedRoute><About userData={userData} /> </ProtectedRoute> },
        { path: 'movies', element: <ProtectedRoute>  <Movies userData={userData} /></ProtectedRoute> },
        { path: 'people', element: <ProtectedRoute><People userData={userData} /> </ProtectedRoute> },
        { path: 'tv', element: <ProtectedRoute><Tv userData={userData} /></ProtectedRoute> },
        { path: 'profile', element: <ProtectedRoute><Profile userData={userData} /> </ProtectedRoute> },
        { path: 'itemdetails/:id/:media_type', element: <ProtectedRoute><ItemDetails userData={userData} /> </ProtectedRoute> },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { path: 'register', element: <Register /> },

      ]
    }
  ]);
  return <>
    <div>

      <Offline><div className='offline'>You Are Offline</div></Offline>
    </div>

    <RouterProvider router={routers} />
  </>
}

export default App;
