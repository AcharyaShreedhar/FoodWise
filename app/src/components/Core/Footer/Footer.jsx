/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 4th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="text-center">
          &copy; {new Date().getFullYear()} FoodWise  | Smart Food Management System
        </p>
      </div>
    </footer>
  );
};

export default Footer;