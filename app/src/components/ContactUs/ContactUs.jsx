/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 14th March 2024
    Application : FoodWise
    ----------------------------------------------------
*/
import React, { useState } from "react";
import { Row, Col, Form, Button, Card } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import Snackbar from "../Core/Snackbar/Snackbar";
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
  });

  const [errors, setErrors] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [email, setEmail] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false); // State to control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State to set the Snackbar message
  const [snackbarSuccess, setSnackbarSuccess] = useState(""); // State to set the Snackbar message

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNewsletterSignup = (e) => {
    e.preventDefault();
    // Handle newsletter signup logic here (e.g., API call)
    console.log("Subscribed with email:", email);
  };

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
      newErrors.name = "Name is required";
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
      newErrors.message = "Message is required";
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
    setShowSnackbar(true);
    setSnackbarSuccess(true);
    setSnackbarMessage("Your Message is sent successfully.Thank you for Contacting us");
    setTimeout(() => {
      // setShowSnackbar(false);
    }, 3000);
  };

  return (
    <div className="contact-container">
      
      <div className="container">
        <Row className="m-0 p-2">
          <div className="faq-section mt-4">
            <h2 className="mb-3 mt-2">Frequently Asked Questions</h2>
            <hr className="mt-2 mb-5" />
            <Accordion>
              <Accordion.Item eventKey="0" className="p-2">
                <Accordion.Header>Q: How does FoodWise work?</Accordion.Header>
                <Accordion.Body>
                  A: FoodWise connects users with local businesses offering
                  discounted surplus food near their location. Users can browse
                  available deals, place orders, and pick up their items at the
                  store.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" className="p-2">
                <Accordion.Header>
                  Q: What are the benefits of using FoodWise?
                </Accordion.Header>
                <Accordion.Body>
                  A: FoodWise offers numerous benefits, including access to
                  affordable, high-quality food, reducing food waste, supporting
                  local businesses, and contributing to sustainability efforts.
                </Accordion.Body>
              </Accordion.Item>
              {/* Add more Accordion.Item components for each additional question */}
              <Accordion.Item eventKey="2" className="p-2">
                <Accordion.Header>
                  Q: Is FoodWise available in multiple cities?
                </Accordion.Header>
                <Accordion.Body>
                  A: Yes, FoodWise operates in multiple cities, allowing users
                  to find surplus food deals in various locations.
                </Accordion.Body>
              </Accordion.Item>
              {/* Add more Accordion.Item components for each additional question */}
              <Accordion.Item eventKey="3" className="p-2">
                <Accordion.Header>
                  Q: How can I pay for my orders on FoodWise?
                </Accordion.Header>
                <Accordion.Body>
                  A: FoodWise typically accepts various payment methods,
                  including credit/debit cards, mobile wallets, and cash on
                  delivery, depending on the participating businesses.
                </Accordion.Body>
              </Accordion.Item>
              {/* Add more Accordion.Item components for each additional question */}
              <Accordion.Item eventKey="4" className="p-2">
                <Accordion.Header>
                  Q: Can I customize my food orders on FoodWise?
                </Accordion.Header>
                <Accordion.Body>
                  A: Yes, many businesses on FoodWise allow users to customize
                  their orders, such as choosing ingredients, portion sizes, and
                  dietary preferences.
                </Accordion.Body>
              </Accordion.Item>
              {/* Add more Accordion.Item components for each additional question */}
              <Accordion.Item eventKey="5" className="p-2">
                <Accordion.Header>
                  Q: Are the food items on FoodWise fresh and safe to consume?
                </Accordion.Header>
                <Accordion.Body>
                  A: FoodWise partners with reputable businesses that adhere to
                  strict food safety standards. However, users should always
                  check the freshness and quality of the items upon receipt.
                </Accordion.Body>
              </Accordion.Item>
              {/* Add more Accordion.Item components for each additional question */}
              <Accordion.Item eventKey="6"className="p-2" >
                <Accordion.Header>
                  Q: Can I return or exchange items purchased through FoodWise?
                </Accordion.Header>
                <Accordion.Body>
                  A: Return and exchange policies may vary depending on the
                  individual businesses. Users are advised to review the terms
                  and conditions provided by each seller.
                </Accordion.Body>
              </Accordion.Item>
              {/* Add more Accordion.Item components for each additional question */}
              <Accordion.Item eventKey="7" className="p-2">
                <Accordion.Header>
                  Q: How can I contact FoodWise customer support?
                </Accordion.Header>
                <Accordion.Body>
                  A: FoodWise provides customer support via email, phone, or
                  live chat on their website. You can find the contact
                  information in the Help or Support section of the app.
                </Accordion.Body>
              </Accordion.Item>
              {/* Add more Accordion.Item components for each additional question */}
              <Accordion.Item eventKey="8" className="p-2">
                <Accordion.Header>
                  Q: Does FoodWise offer discounts or promotions?
                </Accordion.Header>
                <Accordion.Body>
                  A: Yes, FoodWise regularly offers discounts, promotions, and
                  special deals to its users. Make sure to check the app or
                  website for current offers.
                </Accordion.Body>
              </Accordion.Item>
              {/* Add more Accordion.Item components for each additional question */}
              <Accordion.Item eventKey="9" className="p-2">
                <Accordion.Header>
                  Q: How can I provide feedback or suggestions to FoodWise?
                </Accordion.Header>
                <Accordion.Body>
                  A: FoodWise welcomes feedback and suggestions from users. You
                  can submit your feedback through the app's feedback form or
                  contact customer support directly.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Row>
      </div>

      <div className="container mt-4">
        
        <div className="contact-section">
       
          <h2 className="text-center">Have Any Questions ? Reach Out to Us</h2>
          <hr className="m-5" />
          <Row className="m-0 p-2">
          <Snackbar
                  message={snackbarMessage}
                  success={snackbarSuccess}
                  show={showSnackbar}
                />
            <Col md={6} className="map-column">
              <MapContainer />
            </Col>
            <Col md={6}>
              <div className="card pt-2">
                <div className="card-body">
                  <h3 className="mt-5 mb-2">Contact Us</h3>
                  <p className="text-white text-center mt-2">
                    Have a question or feedback? Get in touch with us using the
                    form below.
                  </p>
                  <form onSubmit={handleSubmit} className="p-4">
                    <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.name && "is-invalid"
                        }`}
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
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        className={`form-control ${
                          errors.email && "is-invalid"
                        }`}
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
                      <label htmlFor="message">Message</label>
                      <textarea
                        rows={4}
                        className={`form-control ${
                          errors.message && "is-invalid"
                        }`}
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
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div className="container">
        <div className="contact-section mt-4">
          <Row className="justify-content-center m-0">
            <Col md={8}>
              <div className="newsletter-section mt-4 p-4 text-center bg-light">
                <h2 className="mb-4">Subscribe to Our Newsletter</h2>
                <h4 className="mb-4">
                  Stay updated on the latest news, offers, and tips for reducing
                  food waste.
                </h4>
                <Form onSubmit={handleNewsletterSignup} className="mt-5">
                  <Form.Group controlId="newsletterEmail">
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    variant="outline-primary"
                    className="btn btn-lg mt-5"
                  >
                    Subscribe
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
