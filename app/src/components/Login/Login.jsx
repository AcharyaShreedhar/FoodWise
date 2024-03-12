/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 6th Feb 2024
    UpdatedBy   : Tirth Shah
    Application : FoodWise
    ----------------------------------------------------
*/

import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import Snackbar from "../Core/Snackbar/Snackbar";
import { useUser } from "../../containers/LoginContainer/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    // Add other fields if needed
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showSnackbar, setShowSnackbar] = useState(false); // State to control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State to set the Snackbar message
  const [snackbarSuccess, setSnackbarSuccess] = useState(""); // State to set the Snackbar message

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

    if (!formData.email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    // /enum: ['Admin','Staff', 'User', 'Donor', 'Receiver'],
    e.preventDefault();
    if (!validateForm()) {
      return; // Do not proceed if form validation fails
    }
    try {
      const requestBody = {
        query: `
          query loginUser($email: String!, $password: String!) {
            loginUser(email: $email, password: $password) {
              _id
              email
              password
              userType
              userStatus
            }
          }
        `,
        variables: {
          email: formData.email,
          password: formData.password,
        },
      };
      const response = await fetch("https://foodwise.minipixai.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      if (responseData.data.loginUser) {
        // Handle successful signupsetShowSnackbar(true);
        setUser(responseData.data.loginUser);
        setShowSnackbar(true);
        setSnackbarSuccess(true);
        setSnackbarMessage("Login successful!");
        setTimeout(() => {
          if (responseData.data.loginUser.userType === "Admin") {
            navigate("/dashboard");
          } else {
            navigate("/blog");
          }
        }, 1000);
      } else {
        // Handle signup error
        setShowSnackbar(true);
        setSnackbarSuccess(false);
        setSnackbarMessage("Login failed");
        setTimeout(() => {
          setShowSnackbar(false);
        }, 1000);
        console.error("Login failed.");
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
    }
  };

  return (
    <div className="login-hero">
      <div className="row row m-0 p-0  row-height justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="card mt-5">
            <div className="card-body">
              <h3>Login</h3>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
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
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password && "is-invalid"
                    }`}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="off"
                  />
                  {errors.password && (
                    <div className="invalid-feedback text-danger pt-3">
                      {errors.password}
                    </div>
                  )}
                </div>
                <div className="button text-center">
                  <button type="submit" className="btn sign-in-btn">
                    Log In
                  </button>
                </div>
                <div className="text">
                  <span>
                    Forget your Password ?{" "}
                    <a href="./reset" className="sign-in">
                      {" "}
                      Reset.
                    </a>
                  </span>
                </div>
              </form>
              <Snackbar
                message={snackbarMessage}
                success={snackbarSuccess}
                show={showSnackbar}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
