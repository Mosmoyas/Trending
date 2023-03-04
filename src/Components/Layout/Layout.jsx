import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { Navbar, Footer } from '../index'


const Layout = ({ userData, setuserData }) => {
  let navigation = useNavigate();
  function logOut() {
    localStorage.removeItem('userToken');
    setuserData(null);
    navigation('/login')

  }
  return (
    <>

      <Navbar logOut={logOut} userData={userData} />
      <div className="container">
        <Outlet></Outlet>

      </div>
      <Footer />


    </>
  )
}

export default Layout
