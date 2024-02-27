import React from "react";
import heroImage from "../../../images/hero.svg";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <img src={heroImage} alt="heroImage logo" className="hero-image" />
        <div className="text-content">
          <h6 className="hero-heading"><i>Welcome to FoodWise</i></h6>
          <div className="signup-text mt-4">
            <a href="/signup" className="hero-description mt-4">Sign up to create your account</a>
            <p className="hero-description mt-4">or</p>
            <a href="/login" className="btn btn-hero mt-3">Login</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
