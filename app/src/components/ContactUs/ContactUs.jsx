/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 14th March 2024
    Application : FoodWise
    ----------------------------------------------------
*/
import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./ContactUs.css";

const MapContainer = () => {
  return (
    <div className="map-container">
      <iframe
        title="Location Map"
        width="600"
        height="450"
        loading="lazy"
        frameBorder="0"
        style={{ border: 0 }}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.084222687869!2d-0.13193588422291573!3d51.50665767963696!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4876054b8e2fc07d%3A0x36a02392ba0b0cc8!2sBuckingham+Palace!5e0!3m2!1sen!2suk!4v1569433333894!5m2!1sen!2suk"
      ></iframe>
    </div>
  );
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    message: "",
    // Add other fields if needed
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear previous errors when user starts typing
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "name is required";
      valid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }
    if (!formData.message) {
      newErrors.message = "message is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Do not proceed if form validation fails
    }
  };

  return (
    <div className="contact-container container">
      <Row className="m-0 p-2">
        <Col md={6} className="map-column">
          <MapContainer />
        </Col>
        <Col md={6}>
          <div className="card pt-2">
            <div className="card-body">
              <h3 className="mt-5 mb-2">Contact Us</h3>
              <p className="text-white text-center mt-2">
                Have a question or feedback? Get in touch with us using the form
                below.
              </p>
              <form onSubmit={handleSubmit} className="p-4">
                <div className="form-group">
                  <label htmlFor="name">name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.name && "is-invalid"}`}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {errors.name && (
                    <div className="invalid-feedback text-danger pt-3">
                      {errors.name}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">email address</label>
                  <input
                    type="text"
                    className={`form-control ${errors.email && "is-invalid"}`}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {errors.email && (
                    <div className="invalid-feedback text-danger pt-3">
                      {errors.email}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="message">message</label>
                  <textarea
                    rows={4}
                    className={`form-control ${errors.message && "is-invalid"}`}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    autoComplete="off"
                  />

                  {errors.message && (
                    <div className="invalid-feedback text-danger pt-3">
                      {errors.message}
                    </div>
                  )}
                </div>

                <div className="button text-center">
                  <button type="submit" className="btn sign-in-btn">
                    submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ContactUs;
