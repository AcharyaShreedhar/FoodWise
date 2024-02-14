/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 4th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

import React from "react";
import logo from "../../../images/footer-logo.svg";
import heroImage from "../../../images/footer-image.svg";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="row">
        <div className="col-2 text-center">
          <img className="foodwise-logo" src={logo} alt="foodwise logo" />
        </div>
      </div>
      <div
        className="row"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="col-2"></div>
        <div className="col-9">
          <div className="row">
            <div className="col-md-3">
              <h5>about us</h5>
              <ul>
                <li>company</li>
                <li>team</li>
                <li>blog</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>quick links</h5>
              <ul>
                <li>product support</li>
                <li>careers</li>
                <li>privacy policy</li>
                <li>press</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>connect</h5>
              <ul>
                <li>instagram</li>
                <li>facebook</li>
                <li>x</li>
                <li>linkedin</li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>newsletter</h5>
              <form className="newsletter-form">
                <p>get exclusive updates directly to your inbox</p>
                <div className="input-group">
                  <input type="email" placeholder="Your email" />
                  <button type="submit">Subscribe</button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-2"></div>
        </div>
        <div className="row">
          <div className="col-12 text-center">
            <p>© 2024 FoodWise. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
