import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./ContactUs.css";

const MapContainer = () => {
    return (
      <div className="map-container">
        <iframe
          title="Location Map"
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.084222687869!2d-0.13193588422291573!3d51.50665767963696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876054b8e2fc07d%3A0x36a02392ba0b0cc8!2sBuckingham+Palace!5e0!3m2!1sen!2suk!4v1569433333894!5m2!1sen!2suk"
          allowFullScreen
        ></iframe>
      </div>
    );
  };
  
  const ContactUs = () => {
    return (
      <div className="contact-us-container">
          <Row>
            <Col md={6} className="map-column">
              <MapContainer />
            </Col>
          <Col md={6}>
            <div className="contact-form-container">
              <h2>Contact Us</h2>
              <p>Have a question or feedback? Get in touch with us using the form below.</p>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your name" />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" />
                </Form.Group>
                <Form.Group controlId="formMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Enter your message" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
    </div>
  );
};

export default ContactUs;
