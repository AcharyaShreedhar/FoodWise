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
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <img src={heroImage} alt="heroImage logo" className="hero-image" />
        <div className="text-content">
          <h1 className="hero-heading">Welcome to FoodWise</h1>
          <p className="hero-description">sign up to create your account</p>
          <p className="hero-description">or</p>
          <a href="/employees" className="btn btn-primary">
            Login
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
