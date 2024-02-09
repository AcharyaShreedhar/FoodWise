/*
    ---------------------------------------------------
    Author      : Prashant Sahu
    StudentId   : 8877584
    Date        : 8th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Blog = () => {
    return (
        <Container className='m-5'>
            <Row>
                <Col md={6}>
                    <div className="section">
                        <h2>Waste Management</h2>
                        <p>
                            Proper waste management is crucial for sustainability. Reduce, reuse, and recycle are the key principles to follow. Ensure food waste is minimized by planning meals effectively and composting organic waste.
                        </p>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="section">
                        <h2>Food Nutrition</h2>
                        <p>
                            Understanding food nutrition is essential for maintaining a healthy diet. Ensure your meals are balanced with the right proportions of carbohydrates, proteins, fats, vitamins, and minerals.
                        </p>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <div className="section">
                        <h2>Smart Grocery</h2>
                        <p>
                            With smart grocery solutions, you can streamline your shopping experience. Use apps to create shopping lists, track your expenses, and even receive personalized recommendations based on your dietary preferences.
                        </p>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="section">
                        <h2>Smart Food Inventory Management</h2>
                        <p>
                            Keep track of your food inventory with smart management tools. Utilize features like expiry date tracking, barcode scanning, and automatic replenishment to reduce waste and save money.
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Blog;
