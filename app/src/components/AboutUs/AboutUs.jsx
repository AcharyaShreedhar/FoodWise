/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 14th March 2024
    Application : FoodWise
    ----------------------------------------------------
*/
import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import placeholderImage from "../../images/avatar.jpeg";

const AboutUs = () => {
  return (
    <div className="about-us-container">
    
      <Row className="section">
          <Col>
            <h2>Our Team</h2>
            <p>We are a dedicated team of developers passionate about tackling the issue of food waste through technology.</p>
            {/* Display team members */}
            <Row className="team-members">
              <Col xs={12} md={4}>
                <Image src={placeholderImage} alt="Member 1" roundedCircle />
                <h4>Shree Dhar Acharya</h4>
                <p>Lead Developer</p>
              </Col>
              <Col xs={12} md={4}>
                <Image src={placeholderImage} alt="Member 2" roundedCircle />
                <h4>Tirth Shah</h4>
                <p>Frontend Developer</p>
              </Col>
              <Col xs={12} md={4}>
                <Image src={placeholderImage} alt="Member 3" roundedCircle />
                <h4>Prashant Sahu</h4>
                <p>Backend Developer</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="section">
          <Col>
            <h2>Our Mission</h2>
            <p>At FoodWise, our mission is to create a more sustainable and responsible food supply chain by leveraging technology and community engagement.</p>
          </Col>
        </Row>
        <Row className="section">
          <Col>
            <h2>Why FoodWise?</h2>
            <p>FoodWise was born out of a desire to address the pressing issue of food waste and contribute to global sustainability goals. We believe that by empowering businesses and consumers with innovative solutions, we can make a meaningful difference in the world.</p>
          </Col>
        </Row>
        <Row className="section">
          <Col>
            <h2>Our Vision</h2>
            <p>Our vision is to build a world where every meal counts, where food is valued, and waste is minimized. Together, we can create a future where hunger is eradicated, and our planet thrives.</p>
          </Col>
        </Row>
     
    </div>
  );
};

export default AboutUs;
