/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 2nd April  2024
    Application : FoodWise
    ----------------------------------------------------
*/

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../containers/LoginContainer/UserContext";
import Snackbar from "../Core/Snackbar/Snackbar";

const EditProfile = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const { user, setUser } = useUser();
  const adjustedTimestamp =
    parseInt(user.profile.dateOfBirth) +
    new Date().getTimezoneOffset() * 60 * 1000;
  const [formData, setFormData] = useState({
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    dateOfBirth: new Date(adjustedTimestamp),
    phoneNumber: user.profile.phoneNumber,
    address: user.profile.address,
    profileImage: user.profile.profileImage,
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    profileImage: "",
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSuccess, setSnackbarSuccess] = useState("");

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

  const handleImageUpload = () => {
    const imageData = new FormData();
    imageData.append("file", image);
    imageData.append("upload_preset", "iyxty7af");
    imageData.append("cloud_name", "dd8fsbuxl");
    fetch("https://api.cloudinary.com/v1_1/dd8fsbuxl/image/upload", {
      method: "post",
      body: imageData,
    })
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          ...formData,
          profileImage: data.secure_url,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      valid = false;
    } else if (!/^[A-Za-z]+$/.test(formData.firstName)) {
      newErrors.firstName =
        "First name should only contain alphabetic characters";
      valid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required";
      valid = false;
    } else if (!/^[A-Za-z]+$/.test(formData.lastName)) {
      newErrors.lastName =
        "Last Name should only contain alphabetic characters";
      valid = false;
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
      valid = false;
    } else {
      let dobString = formData.dateOfBirth;
      if (formData.dateOfBirth instanceof Date) {
        const month = formData.dateOfBirth.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
        const day = formData.dateOfBirth.getDate();
        const year = formData.dateOfBirth.getFullYear();
        dobString = `${month.toString().padStart(2, "0")}/${day
          .toString()
          .padStart(2, "0")}/${year}`;
      }
      if (
        !dobString.match(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/)
      ) {
        newErrors.dateOfBirth = "Invalid Date of Birth format (MM/DD/YYYY)";
        valid = false;
      }
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
      valid = false;
    } else if (!/^\+?\d{0,3}\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Invalid Phone Number format. Please enter a valid phone number with country code (if applicable) and 10 digits after.";
      valid = false;
    }

    if (!formData.address) {
      newErrors.address = "Address is required";
      valid = false;
    }

    if (!formData.profileImage) {
      newErrors.profileImage = "Profile Image is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("Validation failed");
      return;
    }
    try {
      const formattedDateOfBirth =
      formData.dateOfBirth instanceof Date
        ? `${
            formData.dateOfBirth.getMonth() + 1
          }/${formData.dateOfBirth.getDate()}/${formData.dateOfBirth.getFullYear()}`
        : formData.dateOfBirth;
      const requestBody = {
        query: `
        mutation UpdateUserProfile($input: UserProfileInput!) {
            updateUserProfile(input: $input) {
              _id
              address
              dateOfBirth
              firstName
              lastName
              phoneNumber
              profileImage
              userId
            }
          }
        `,
        variables: {
          input: {
            userProfileId: user.profile._id,
            userId: user._id,
            firstName: formData.firstName,
            lastName: formData.lastName,
            dateOfBirth: formattedDateOfBirth,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            profileImage: formData.profileImage,
          },
        },
      };

      const response = await fetch("https://foodwiseapi.onrender.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      console.log('formdata',formData)
console.log('response',response)
      const responseData = await response.json();
      console.log('responseData',responseData)

      if (responseData.data.updateUserProfile) {
        setShowSnackbar(true);
        setSnackbarSuccess(true);
        setSnackbarMessage("Profile has been successfully updated");
        setTimeout(() => {
          navigate("/viewprofile");
        }, 3000);
      } else {
        setShowSnackbar(true);
        setSnackbarSuccess(false);
        setSnackbarMessage("Unable to update profile. Please try again.");
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error occurred during profile update:", error);
    }
  };
  console.log("formdata dateofbirth", formData.dateOfBirth);

  return (
    <div className="edit-profile-hero">
      <div className="container">
        <div className="row m-0 justify-content-center align-items-center">
          <div className="col-md-4">
            <div className="card mt-5 mb-5">
              <div className="card-body">
                <h3 className="mt-5">Edit Profile</h3>
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.firstName && "is-invalid"
                      }`}
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.firstName && (
                      <div className="invalid-feedback text-danger pt-3">
                        {errors.firstName}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.lastName && "is-invalid"
                      }`}
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.lastName && (
                      <div className="invalid-feedback text-danger pt-3">
                        {errors.lastName}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="dateOfBirth">Date of Birth</label>
                    <DatePicker
                      selected={formData.dateOfBirth}
                      onChange={(date) => {
                        if (date instanceof Date && !isNaN(date.getTime())) {
                          setFormData({
                            ...formData,
                            dateOfBirth: date,
                          });
                        }
                      }}
                      className={`form-control ${
                        errors.dateOfBirth && "is-invalid"
                      }`}
                    />
                    {errors.dateOfBirth && (
                      <div className="invalid-feedback text-danger d-block pt-3">
                        {errors.dateOfBirth}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.phoneNumber && "is-invalid"
                      }`}
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.phoneNumber && (
                      <div className="invalid-feedback text-danger pt-3">
                        {errors.phoneNumber}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.address && "is-invalid"
                      }`}
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.address && (
                      <div className="invalid-feedback text-danger pt-3">
                        {errors.address}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="profileImage">Profile Image</label>
                    <input
                      type="file"
                      className="form-control text-white "
                      name="profileImage"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <button
                      type="button"
                      onClick={handleImageUpload}
                      className="btn btn-lg btn-success mt-2"
                    >
                      Upload
                    </button>
                  </div>
                  <div className="form-group">
                    <img src={formData.profileImage} alt="Profile" />
                  </div>
                  <div className="button text-center">
                    <button type="submit" className="btn btn-lg btn-primary">
                      Update Profile
                    </button>
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

export default EditProfile;
