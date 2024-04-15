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
              <h6 className="bold-text">about us</h6>
              <ul>
                <li>company</li>
                <li>team</li>
                <li>blog</li>
                <li>faq</li>
              </ul>
            </div>
            <div className="col-md-2">
              <h6 className="bold-text">quick links</h6>
              <ul>
                <li>product support</li>
                <li>careers</li>
                <li>privacy policy</li>
                <li>press</li>
              </ul>
            </div>
            <div className="col-md-2">
              <h6 className="bold-text">connect</h6>
              <ul>
                <li>instagram</li>
                <li>facebook</li>
                <li>X</li>
                <li>linkedin</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h6 className="bold-text"> newsletter</h6>
              <p>get exclusive updates directly to your inbox.</p>
              {/* Add your newsletter subscription form here */}
              <div class="input-group">
                <input type="search" class="form-control" placeholder="search" aria-label="Search" aria-describedby="search-addon" />
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
