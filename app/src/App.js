/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 6th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Core/Header/Header";
import Footer from "./components/Core/Footer/Footer";
import HomeContainer from "./containers/HomeContainer/HomeContainer";
import SignUpContainer from "./containers/SignUpContainer/SignUpContainer";
import LoginContainer from "./containers/LoginContainer/LoginContainer";
import BlogContainer from "./containers/AwarenessContainer/AwarenessContainer";
const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomeContainer />} />
        <Route path="/signup" element={<SignUpContainer />} />
        <Route path="/blog" element={<BlogContainer />} />
        <Route path="/login"  element={<LoginContainer />} /> 
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
