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

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomeContainer />} />
        <Route path="/signup" element={<SignUpContainer />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
