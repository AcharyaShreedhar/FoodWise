import React from "react";
import { Link } from "react-router-dom"; // Import useHistory hook
import { useNavigate } from 'react-router-dom';
import logo from "../../../images/logo.png";
import { useUser } from "../../../containers/LoginContainer/UserContext";
import "./Header.css";

const Header = () => {
  const { user, setUser } = useUser(); // Get setUser function from UserContext
  const navigate = useNavigate();

 // Logout function with confirmation dialog
 const handleLogout = () => {
  const shouldLogout = window.confirm("Are you sure you want to log out?");
  if (shouldLogout) {
    // Clear user information
    setUser(null);
    // Redirect user to login page
    navigate('/login');
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
            {/* Render menu items based on user type */}
            {user && user.userType === "Admin" && (
              <li className="nav-item active">
                <Link className="nav-link" to="/dashboard">
                  home
                </Link>
              </li>
            )}
            {user &&
              user.userType === "Admin" && (
                <li className="nav-item active">
                  <Link className="nav-link" to="/products">
                    products
                  </Link>
                </li>
              )}
            <li className="nav-item active">
              <Link className="nav-link" to="/blog">
                blog
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/about">
                about us
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to="/contacts">
                contacts
              </Link>
            </li>
            {user && (
              <li className="nav-item active">
                <Link className="nav-link" onClick={handleLogout}>logout</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
