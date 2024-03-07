/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 6th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

import React from "react";
import heroImage from "../../../images/hero.svg";
import "./Footer.css";
import logo from "../../../images/logo.png";
import foodwise from "../../../images/foodwise.png"


const Footer = () => {
  return (
    <>
      <div className="footer-header">
        <div className="row m-1">
          <div className="col-md-3">
            <img src={foodwise} alt="foodwise logo" className="footer-img" />
          </div>
        </div>

        <div className="row m-1">
          <div className="col-md-3"></div>
            <div className="col-md-2">
              <h6>About Us</h6>
              <ul>
                <li>Company</li>
                <li>Team</li>
                <li>Blog</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div className="col-md-2">
              <h6>Quick Links</h6>
              <ul>
                <li>product support</li>
                <li>careers</li>
                <li>privacy policy</li>
                <li>press</li>
              </ul>
            </div>
            <div className="col-md-2">
              <h6>Connect</h6>
              <ul>
                <li>instagram</li>
                <li>facebook</li>
                <li>X</li>
                <li>linkedin</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h6>Newsletter</h6>
              <p>get exclusive updates directly to your inbox.</p>
              {/* Add your newsletter subscription form here */}
              <div class="input-group">
                <input type="search" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <button type="button" class="btn btn-primary subscribe-btn">search</button>
              </div>
            </div>
          </div>
          <div className="row m-1 p-5 text-center align-items-center justify-content-center">
            <div className="col-md-12">
              <div className="copyright-text">
                <i className="fa-regular fa-copyright"></i>
                2024 FoodWise. All Rights Reserved
              </div>
            </div>
          </div>
          </div>
    </>
  );
};

export default Footer;
