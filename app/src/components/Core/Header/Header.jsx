/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 14th March 2024
    Application : FoodWise
    ----------------------------------------------------
*/

import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../../../images/logo.png";
import placeholderImage from "../../../images/avatar.jpeg";
import { useUser } from "../../../containers/LoginContainer/UserContext";
import "./Header.css";

const Header = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    const shouldLogout = window.confirm("Are you sure you want to log out?");
    if (shouldLogout) {
      setUser(null);
      navigate("/login");
    }
  };

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
            {user && user.userType === "Admin" &&(
              <li className="nav-item active">
                <Link className="nav-link" to="/dashboard">
                  Home
                </Link>
              </li>
            )}
            {user && user.userType === "Admin" &&  (
              <li className="nav-item active">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
            )}
            <li className="nav-item active">
              <Link className="nav-link" to="/donations">
                Donations
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/blog">
                Blog
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/aboutus">
                About Us
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/contactus">
                Contact Us
              </Link>
            </li>
            {user && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                     src={user && user.profile ? (user.profile.profileImage) : placeholderImage}
                    alt="Profile Avatar"
                    className="profile-avatar pr-5"
                  />
                  <span className="ml-5">{user && user.profile ? (user.profile.firstName) : user.email}</span>
                </a>
                <div
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {user && user.profile && (<Link className="dropdown-item" to="/viewprofile">
                    View Profile
                  </Link> )}
                  <Link className="dropdown-item" to="/createprofile">
                    Create Profile
                  </Link>
                  {user && user.profile && (<Link className="dropdown-item" to="/editprofile">
                    Edit Profile
                  </Link>
                  )}
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
