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
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <Row className="m-0 mt-2">
        <Col>
          <h2 className="section-title">Our Team</h2>
          <h4 className="text-white mb-5">
            We are a dedicated team of developers passionate about tackling the
            issue of food waste through technology.
          </h4>
          <hr className="text-white mt-5 mb-5" />
          <Row className="team-members m-0 mt-2">
            <Col xs={12} md={4}>
              <div className="team-member p-5">
                <Image src={ShreeImage} alt="Member 1" roundedCircle className="profile-image" />
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
            <Col xs={12} md={4}>
              <div className="team-member p-5">
                <Image src={placeholderImage} alt="Member 2" roundedCircle className="profile-image"/>
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
                <Image src={placeholderImage} alt="Member 3" roundedCircle className="profile-image"/>
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
      <hr className="text-white mt-5 mb-5" />
      <div className="m-0 mb-5 cta">
        <Button variant="primary" className="cta-button  btn mb-5">
          Meet the Team
        </Button>
      </div>
      <hr className="text-white mt-5 mb-5" />
      <Row className="section m-0 mb-5">
        <Col>
          <h2 className="section-title">Our Mission</h2>
          <h4 className="text-white">
            At FoodWise, our mission is to create a more sustainable and
            responsible food supply chain by leveraging technology and community
            engagement.
          </h4>
        </Col>
      </Row>
      <Row className="section m-0 mb-5">
        <Col>
          <h2 className="section-title">Why FoodWise?</h2>
          <h4 className="text-white">
            FoodWise was born out of a desire to address the pressing issue of
            food waste and contribute to global sustainability goals. We believe
            that by empowering businesses and consumers with innovative
            solutions, we can make a meaningful difference in the world.
          </h4>
        </Col>
      </Row>
      <Row className="section m-0 mb-5">
        <Col>
          <h2 className="section-title">Our Vision</h2>
          <h4 className="text-white">
            Our vision is to build a world where every meal counts, where food
            is valued, and waste is minimized. Together, we can create a future
            where hunger is eradicated, and our planet thrives.
          </h4>
        </Col>
      </Row>
    </div>
  );
};

export default AboutUs;
