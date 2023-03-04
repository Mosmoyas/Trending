import jwtDecode from 'jwt-decode';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';

import { Layout, Home, About, Movies, Tv, People, Register, Login, Profile, ProtectedRoute } from './Components/index';
import { useState, useEffect } from 'react';
const { Buffer } = require('buffer');

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
        { path: 'home', element: <ProtectedRoute><Home userData={userData} /> </ProtectedRoute> },
        { path: 'about', element: <ProtectedRoute><About userData={userData} /> </ProtectedRoute> },
        { path: 'movies', element: <ProtectedRoute>  <Movies userData={userData} /></ProtectedRoute> },
        { path: 'people', element: <ProtectedRoute><People userData={userData} /> </ProtectedRoute> },
        { path: 'tv', element: <ProtectedRoute><Tv userData={userData} /></ProtectedRoute> },
        { path: 'profile', element: <ProtectedRoute><Profile userData={userData} /> </ProtectedRoute> },
        { path: 'login', element: <Login saveUserData={saveUserData} /> },
        { index: true, element: <Register /> },

      ]
    }
  ]);
  return <RouterProvider router={routers} />
}

export default App;
