/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 14th March 2024
    Application : FoodWise
    ----------------------------------------------------
*/
import React from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import placeholderImage from "../../images/avatar.jpeg";
import ShreeImage from "../../images/Shree1.jpeg";
import PrashantImage from "../../images/prashant.jpeg";
import AboutUsImage from "../../images/foodwaste.jpeg";
import MissionImage from "../../images/mission.gif";
import WhyUsImage from "../../images/logo.png";
import VisionImage from "../../images/vision.jpeg";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <hr className=" mt-0 mb-5" />
      <Row className="section bio m-0">
      <Col xs={12} sm={12} md={12} lg={6} className="order-lg-2">
          <div className="image-container">
            <Image src={AboutUsImage} alt="About Us" fluid />
          </div>
        </Col>
        <Col xs={12} sm={12} md={12} lg={6} className="order-lg-1">
          <h1>About Us</h1>
          <p className="pt-5">
            Food Wise is an innovative platform that addresses the pressing
            issue of food waste by connecting businesses and consumers with
            surplus food to those in need. Through our technology-driven
            solutions and community engagement, we strive to reduce food waste,
            promote sustainability, and ensure that no meal goes to waste.​ Our
            platform facilitates the redistribution of surplus food from
            restaurants, grocery stores, and events to local shelters, food
            banks, and community organizations. By providing a seamless and
            efficient way to donate excess food, we not only minimize waste but
            also help alleviate hunger in our communities.​
          </p>
        </Col>
      </Row>
      <hr className=" mt-0 mb-5" />
      <Row className="section bio m-0">
        <Col xs={12} sm={12} lg={6} className="order-lg-1">
          <div className="image-container">
            <Image src={WhyUsImage} alt="Why Choose Us" fluid />
          </div>
        </Col>
        <Col xs={12} sm={12} lg={6} className="order-lg-2">
          <h1>Why FoodWise ?</h1>
          <p className="pt-5">
            Food Wise was born out of a desire to address the pressing issue of
            food waste and contribute to global sustainability goals. We believe
            that by empowering businesses and consumers with innovative
            solutions, we can make a meaningful difference in the world.​
          </p>
        </Col>
      </Row>
      <hr className=" mt-0 mb-5" />
      <Row className="section bio m-0">
      <Col xs={12} sm={12} lg={6} className="order-lg-2">
          <div className="image-container">
            <Image src={VisionImage} alt="Image for Vision" fluid />
          </div>
        </Col>
        <Col xs={12} sm={12} lg={6} className="order-lg-1">
          <h1>Our Vision</h1>
          <p className="pt-5">
            Food Wise is an innovative platform that addresses the pressing
            issue of food waste by connecting businesses and consumers with
            surplus food to those in need. Through our technology-driven
            solutions and community engagement, we strive to reduce food waste,
            promote sustainability, and ensure that no meal goes to waste.​ Our
            platform facilitates the redistribution of surplus food from
            restaurants, grocery stores, and events to local shelters, food
            banks, and community organizations. By providing a seamless and
            efficient way to donate excess food, we not only minimize waste but
            also help alleviate hunger in our communities.​
          </p>
        </Col>
        
      </Row>
      <hr className=" mt-0 mb-0" />
      <Row className="section bio m-0">
        <Col xs={12} sm={12} lg={6} className="order-lg-1">
          <div className="image-container">
            <Image src={MissionImage} alt="Our Mission Image" fluid />
          </div>
        </Col>
        <Col xs={12} sm={12} lg={6} className="order-lg-2">
          <h1>Our Mission</h1>
          <p className="pt-5">
            At Food Wise, our mission is to create a more sustainable and
            responsible food supply chain by leveraging technology and community
            engagement. We aim to bridge the gap between surplus food and
            hunger, ensuring that no food goes to waste while addressing food
            insecurity.​
          </p>
        </Col>
      </Row>

      <hr className=" mt-0 mb-5" />
      <Row className="m-0 mt-2">
        <Col>
          <h2 className="section-title text-center">Our Team</h2>
          <h3 className="mb-5 text-center team-desc">
            We are a dedicated team of developers passionate about tackling the
            issue of food waste through technology.
          </h3>
          <hr className=" mt-5 mb-5" />
          <Row className="team-members m-0 mt-2">
            <Col xs={12} md={4}>
              <div className="team-member p-5">
                <Image
                  src={ShreeImage}
                  alt="Member 1"
                  roundedCircle
                  className="team-profile-image"
                />
                <h3>Shree Dhar Acharya</h3>
                <h4 className="mb-5">
                  Senior Full Stack Developer | Senior Software Engineer |
                  Project Manager
                </h4>
                <p>
                  Adaptable Senior Full Stack Developer with expertise in
                  MERN/PERN stack. Proven track record in developing and
                  maintaining production web applications. Strong
                  problem-solving skills, quick learner, and effective
                  communicator. Committed to continuous learning and
                  contributing effectively to software systems.
                </p>
              </div>
            </Col>
          </Row>
          <Row className="team-members m-0 mt-2">
            <Col xs={12} md={4}>
              <div className="team-member p-5">
                <Image
                  src={placeholderImage}
                  alt="Member 2"
                  roundedCircle
                  className="team-profile-image"
                />
                <h3>Tirth Shah</h3>
                <h4 className="mb-5">Frontend Developer | UI/UX Developer</h4>
                <p>
                  Creative and detail-oriented Frontend Developer with a passion
                  for crafting beautiful and user-friendly interfaces.
                  Proficient in HTML, CSS, JavaScript, and various frontend
                  frameworks. Experienced in translating design mockups into
                  responsive web pages that delight users.
                </p>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="team-member p-5">
                <Image
                  src={PrashantImage}
                  alt="Member 3"
                  roundedCircle
                  className="team-profile-image"
                />
                <h3>Prashant Sahu</h3>
                <h4 className="mb-5">Front End Developer | Content Creator</h4>
                <p>
                  Creative Frontend Developer with a passion for building
                  user-centric web applications. Proficient in modern frontend
                  technologies and frameworks. Experienced in content creation
                  and digital marketing strategies. Dedicated to delivering
                  high-quality, engaging, and accessible web experiences.
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <hr className="mt-5 mb-5" />
      <div className="m-0 mb-5 cta">
        <Button variant="primary" className="cta-button  btn mb-5">
          Meet the Team
        </Button>
      </div>
    </div>
  );
};

export default AboutUs;
