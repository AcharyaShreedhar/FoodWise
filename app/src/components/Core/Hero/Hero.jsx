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
import { useUser } from "../../../containers/LoginContainer/UserContext";
import "./Hero.css";

const Hero = () => {
  const { user } = useUser();

  // Define the slogan based on user login status
  const slogan = user ? "Contributing to zero waste, one meal at a time!" : "";

  return (
    <section className="hero">
      <div className="hero-content">
        <img src={heroImage} alt="heroImage logo" className="hero-image" />
        <div className="text-content justify-content-center">
          <h6 className="hero-heading mt-5 mb-5"><i>{slogan}</i></h6>
          <h2 className="hero-heading text-center">Welcome to FoodWise</h2>
          {!user && (
            <div className="signup-text mt-4">
              <a href="/signup" className="hero-description mt-4">Sign up to create your account</a>
              <p className="hero-description mt-4">or</p>
              <a href="/login" className="btn btn-hero mt-3">Login</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
