/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 6th Feb 2024
    UpdatedBy   : Tirth Shah
    Application : FoodWise
    ----------------------------------------------------
*/

import React from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../apis/addUser";
import "./SignUp.css";

const SignUp = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });

  const [addUser] = useMutation(ADD_USER);

  const handleChange = (e) => {
    //implement handleChange here
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addUser({})
      .then((response) => {
        //handle success
      })
      .catch((error) => {
        //handle error
      });
  };
  return (
    <div className="container">
      <p className="text-center">SignUp Form</p>
    </div>
  );
};

export default SignUp;
