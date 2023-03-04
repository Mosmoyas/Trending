import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ userData, logOut }) => {
  console.log('login');

  return (
    <nav className=" my-body p-2 flex-md-row flex-column d-flex justify-content-between">
      <div className="left-nav flex-md-row flex-column d-flex align-items-center ">
        <h1 className="m-0 pe-3">Noxe</h1>
        {userData ? (
          <ul className="list-unstyled d-flex m-0 align-items-center">
            <li className="px-2">
              <Link className="mylink" to="/">
                Home
              </Link>{" "}
            </li>
            <li className="px-2">
              <Link className="mylink" to="about">
                About
              </Link>{" "}
            </li>
            <li className="px-2">
              <Link className="mylink" to="tv">
                Tv
              </Link>{" "}
            </li>
            <li className="px-2">
              <Link className="mylink" to="people">
                People
              </Link>{" "}
            </li>
            <li className="px-2">
              <Link className="mylink" to="movies">
                Movies
              </Link>{" "}
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>

      <div className="right-nav flex-md-row flex-column  d-flex align-items-center">
        <div className="social-media">
          <i className="fab mx-1 fa-facebook"></i>
          <i className="fab mx-1 fa-instagram"></i>
          <i className="fab mx-1 fa-twitter"></i>
          <i className="fab mx-1 fa-spotify"></i>
          <i className="fab mx-1 fa-youtube"></i>
        </div>
        <ul className="list-unstyled flex-md-row flex-column d-flex m-0 align-items-center">
          {userData ? (
            <div className="d-flex align-items-center">
              <li className="px-2">
                <Link className="mylink" to="profile">
                  Profile
                </Link>{" "}
              </li>
              <li onClick={logOut} className="px-2 cursor-pointer">
                <span >Logout</span>{" "}
              </li>
            </div>
          ) : (
            <div className="d-flex align-items-center">
              <li className="px-2">
                <Link className="mylink" to="register">
                  Register
                </Link>{" "}
              </li>
              <li className="px-2">
                <Link className="mylink" to="login">
                  Login
                </Link>{" "}
              </li>
            </div>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
