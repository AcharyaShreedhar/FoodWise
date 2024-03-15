/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 14th March 2024
    Application : FoodWise
    ----------------------------------------------------
*/
import React, { useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";
import Snackbar from "../Core/Snackbar/Snackbar";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    userType: "User",
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
          mutation CreateUser($email: String!, $password: String!, $userType: String!,$userStatus:Boolean) {
            createUser(email: $email, password: $password,userType: $userType, userStatus:$userStatus) {
             
              email
              password
            }
          }
        `,
        variables: {
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
          userStatus: formData.userType === "Admin" ? true : false,
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
      console.log("responsedata", responseData);

      if (responseData.data.createUser) {
        // Handle successful signup
        setShowSnackbar(true);
        setSnackbarSuccess(true);
        setSnackbarMessage("User has been successfully registered");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
        console.log("User signed up successfully!");
      } else {
        // Handle signup error
        setShowSnackbar(true);
        setSnackbarSuccess(false);
        setSnackbarMessage("Signup failed");
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
        console.error("Signup failed.");
      }
    } catch (error) {
      console.error("Error occurred during signup:", error);
    }
  };

  return (
    <div className="signup-hero">
      <div className="container">
        <div className="row m-0 p-0 row-height justify-content-center align-items-center">
          <div className="col-md-4">
            <div className="card mt-5">
              <div className="card-body">
                <h3 className="mt-5">Create an Account</h3>
                <form onSubmit={handleSubmit} className="p-4">
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
                  <div className="form-group">
                    <label htmlFor="userType">User Type</label>
                    <select
                      className="form-control"
                      name="userType"
                      value={formData.userType}
                      onChange={handleChange}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Staff">Staff</option>
                      <option value="User">User</option>
                      <option value="Donor">Donor</option>
                      <option value="Receiver">Receiver</option>
                    </select>
                  </div>
                  <div className="button text-center">
                    <button type="submit" className="btn  sign-in-btn">
                      Sign Up
                    </button>
                  </div>
                  <div className="text">
                    <span>
                      Already have an account?{" "}
                      <a href="./login" className="sign-in">
                        {" "}
                        Sign In
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
    </div>
  );
};

export default SignUp;
