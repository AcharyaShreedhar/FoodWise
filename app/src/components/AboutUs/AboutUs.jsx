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
import AboutUsImage from "../../images/about1.png";
import MissionImage from "../../images/mission1.png";
import WhyUsImage from "../../images/whyus1.png";
import VisionImage from "../../images/vision.png";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <hr className=" mt-0 mb-0" />
      <div className="section m-0">
        <Col sm={9}>
          <div className="image-container">
            <Image src={AboutUsImage} alt="About Us" fluid />
          </div>
        </Col>
        <Col sm={3}></Col>
      </div>
      <hr className=" mt-0 mb-0" />
      <div className="section m-0">
        <Col sm={3}></Col>
        <Col sm={9}>
          <div className="image-container">
          <Image src={WhyUsImage} alt="Why Choose Us" fluid />
          </div>
        </Col>
      </div>
      <hr className=" mt-0 mb-0" />
      <div className="section m-0">
        <Col sm={9}>
          <div className="image-container">
          <Image src={VisionImage} alt="Our Vision" fluid />
          </div>
        </Col>
        <Col sm={3}></Col>
      </div>
      <hr className=" mt-0 mb-0" />
      <div className="section m-0">
        <Col sm={3}></Col>
        <Col sm={9}>
          <div className="image-container">
          <Image src={MissionImage} alt="Our Mission" fluid />
          </div>
        </Col>
      </div>
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
