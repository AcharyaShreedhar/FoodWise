/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 4th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

import React from "react";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="foodwise logo" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                home
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link"  to="/blog">
                blog
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" >
                about us
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" >
                products
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" >
                contacts
              </Link>
            </li>

          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
