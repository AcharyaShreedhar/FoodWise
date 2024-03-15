/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 14th March 2024
    Application : FoodWise
    ----------------------------------------------------
*/
import React from "react";
import { Container, Row, Col, Card, Button, Carousel } from "react-bootstrap";
import PosterImage1 from "../../images/poster1.png";
import PosterImage2 from "../../images/poster2.png";
import PosterImage3 from "../../images/poster3.png";
import PosterImage4 from "../../images/poster4.png";
import PosterImage5 from "../../images/poster5.png";
import PosterImage6 from "../../images/poster6.png";
import PosterImage7 from "../../images/poster7.png";
import PosterImage8 from "../../images/poster8.png";
import PosterImage9 from "../../images/poster9.png";
import PosterImage10 from "../../images/poster10.png";
import "./Blog.css";

const Blog = () => {
  return (
    <div className="blog-container m-0 p-5">
      <hr className="text-white mt-5 mb-5" />
      <h2 className="hero-heading text-center text-white">
        FoodWise was born out of a desire to address the pressing issue of food
        waste and contribute to global sustainability goals. We believe that by
        empowering businesses and consumers with innovative solutions, we can
        make a meaningful difference in the world.
      </h2>
      <hr className="text-white mt-5 mb-5" />
      <div className="carousel-container">
        <Carousel>
          <Carousel.Item>
            <img src={PosterImage1} alt="Poster 1" className="d-block w-100" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={PosterImage2} alt="Poster 2" className="d-block w-100" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={PosterImage3} alt="Poster 3" className="d-block w-100" />
          </Carousel.Item>
          <Carousel.Item>
            <img src={PosterImage4} alt="Poster 4" className="d-block w-100" />
          </Carousel.Item>
        </Carousel>
      </div>
      <hr className="text-white mt-5 mb-5" />
      <div className="poster-grid-container clearfix">
        <Row className="m-0">
          <Col sm={4} md={4} lg={4}>
            <Card className="poster-card">
              <Card.Img variant="top" src={PosterImage5} />
            </Card>
          </Col>
          <Col sm={4} md={4} lg={4}>
            <Card className="poster-card">
              <Card.Img variant="top" src={PosterImage6} />
            </Card>
          </Col>
          <Col sm={4} md={4} lg={4}>
            <Card className="poster-card">
              <Card.Img variant="top" src={PosterImage7} />
            </Card>
          </Col>
          <Col sm={4} md={4} lg={4}>
            <Card className="poster-card">
              <Card.Img variant="top" src={PosterImage8} />
            </Card>
          </Col>
          <Col sm={4} md={4} lg={4}>
            <Card className="poster-card">
              <Card.Img variant="top" src={PosterImage9} />
            </Card>
          </Col>
          <Col sm={4} md={4} lg={4}>
            <Card className="poster-card">
              <Card.Img variant="top" src={PosterImage10} />
            </Card>
          </Col>
        </Row>
      </div>
      <hr className="text-white mt-5 mb-5" />
      <div className="m-0 posts-container">
        <Row className="m-0">
          <Col sm={8}>
            <Row className="m-0">
              <Card className="blog-card">
                <Card.Body>
                  <Card.Title>How to Reduce Food Waste at Home</Card.Title>
                  <Card.Text>
                    Learn practical tips and tricks for minimizing food waste in
                    your household and making the most of your groceries.
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="btn btn-lg"
                    href="/article/how-to-reduce-food-waste"
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
              <Card className="blog-card">
                <Card.Body>
                  <Card.Title>
                    The Role of Technology in Food Management
                  </Card.Title>
                  <Card.Text>
                    Explore how technology, including IoT devices and AI
                    algorithms, is revolutionizing food management and reducing
                    waste.
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="btn btn-lg"
                    href="/article/role-of-technology-in-food-management"
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
              <Card className="blog-card">
                <Card.Body>
                  <Card.Title>
                    Success Stories: Users Share Their FoodWise Experience
                  </Card.Title>
                  <Card.Text>
                    Hear from users who have implemented the Smart Food
                    Management System and how it has helped them reduce food
                    waste.
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="btn btn-lg"
                    href="/article/user-stories"
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
              <Card className="blog-card">
                <Card.Body>
                  <Card.Title>Sustainable Practices for Restaurants</Card.Title>
                  <Card.Text>
                    Discover sustainable practices that restaurants can adopt to
                    minimize food waste, reduce costs, and attract eco-conscious
                    customers.
                  </Card.Text>
                  <Button
                    className="btn btn-lg"
                    variant="primary"
                    href="/article/sustainable-practices-for-restaurants"
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Row>
          </Col>

          <Col sm={4}>
            <Row className="m-0">
              <Card className="sidebar-card">
                <Card.Body>
                  <Card.Title>Upcoming Events</Card.Title>
                  <Card.Text>
                    Join us for webinars, workshops, and community events
                    focused on food waste reduction and sustainability.
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="btn btn-lg"
                    href="/events"
                  >
                    View All Events
                  </Button>
                </Card.Body>
              </Card>
              <Card className="sidebar-card">
                <Card.Body>
                  <Card.Title>Latest Project Updates</Card.Title>
                  <Card.Text>
                    Stay informed about the latest developments in the FoodWise
                    project, including new features and milestones achieved.
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="btn btn-lg"
                    href="/project-updates"
                  >
                    View All Updates
                  </Button>
                </Card.Body>
              </Card>
              <Card className="sidebar-card">
                <Card.Body>
                  <Card.Title>FoodWise in the News</Card.Title>
                  <Card.Text>
                    Read articles and press releases featuring FoodWise and our
                    efforts to combat food waste.
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="btn btn-lg"
                    href="/in-the-news"
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
              <Card className="sidebar-card">
                <Card.Body>
                  <Card.Title>Subscribe to Our Newsletter</Card.Title>
                  <Card.Text>
                    Stay updated with the latest news, articles, and events from
                    FoodWise by subscribing to our newsletter.
                  </Card.Text>
                  <Button
                    variant="primary"
                    className="btn btn-lg"
                    href="/subscribe"
                  >
                    Subscribe Now
                  </Button>
                </Card.Body>
              </Card>
            </Row>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Blog;
