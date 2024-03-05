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
import { Provider } from 'react-redux';
import store from './containers/ProductsContainer/store';
import Header from "./components/Core/Header/Header";
import Footer from "./components/Core/Footer/Footer";
import HomeContainer from "./containers/HomeContainer/HomeContainer";
import SignUpContainer from "./containers/SignUpContainer/SignUpContainer";
import LoginContainer from "./containers/LoginContainer/LoginContainer";
import BlogContainer from "./containers/AwarenessContainer/AwarenessContainer";
import ResetContainer from "./containers/ResetContainer/ResetContainer";
import SetPasswordContainer from "./containers/SetPasswordContainer/SetPasswordContainer";
import ProductsContainer from "./containers/ProductsContainer/ProductsContainer";
const App = () => {
  return (
    <Provider store={store}>
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<HomeContainer />} />
        <Route path="/signup" element={<SignUpContainer />} />
        <Route path="/blog" element={<BlogContainer />} />
        <Route path="/login"  element={<LoginContainer />} /> 
        <Route path="/reset"  element={<ResetContainer />} /> 
        <Route path="/set"  element={<SetPasswordContainer />} /> 
      
        <Route path="/products/*"  element={<ProductsContainer />} /> 
     
      </Routes>
      <Footer />
    </Router>
    </Provider>
  );
};

export default App;
