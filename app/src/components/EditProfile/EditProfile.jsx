/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 2nd April  2024
    Application : FoodWise
    ----------------------------------------------------
*/

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../containers/LoginContainer/UserContext";
import Snackbar from "../Core/Snackbar/Snackbar";

const EditProfile = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const { user, setUser } = useUser();

  const [formData, setFormData] = useState({
    firstName: user.profile.firstName,
    lastName: user.profile.lastName,
    dateOfBirth: user.profile.dateOfBirth,
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
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last Name is required";
      valid = false;
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of Birth is required";
      valid = false;
    }

    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
      valid = false;
    }
    if (!formData.address) {
      newErrors.address = "Address is required";
      valid = false;
    }

    if (!formData.profileImage) {
      newErrors.profileImage = "ProfileImage is required";
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
            dateOfBirth: formData.dateOfBirth,
            phoneNumber: formData.phoneNumber,
            address: formData.address,
            profileImage: formData.profileImage,
          },
        },
      };

      const response = await fetch("http://localhost:4021/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();

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

  return (
    <div className="edit-profile-hero">
      <div className="container">
        <div className="row justify-content-center align-items-center">
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
                    <input
                      type="text"
                      className={`form-control ${
                        errors.dateOfBirth && "is-invalid"
                      }`}
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.dateOfBirth && (
                      <div className="invalid-feedback text-danger pt-3">
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
