/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 2nd April  2024
    Application : FoodWise
    ----------------------------------------------------
*/
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "../../containers/LoginContainer/UserContext";
import Snackbar from "../Core/Snackbar/Snackbar";

const CreateProfile = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const { user, setUser } = useUser();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: null,
    phoneNumber: "",
    address: "",
    profileImage: "default.png",
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    profileImage: "",
  });

  const [showSnackbar, setShowSnackbar] = useState(false); // State to control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State to set the Snackbar message
  const [snackbarSuccess, setSnackbarSuccess] = useState(""); // State to set the Snackbar message

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
      return; // Do not proceed if form validation fails
    }
    try {
      const requestBody = {
        query: `
        mutation CreateUserProfile($firstName: String!, $lastName: String!, $dateOfBirth: String!, $phoneNumber: String!, $address: String!, $profileImage: String, $userId: String) {
          createUserProfile(firstName: $firstName, lastName: $lastName, dateOfBirth: $dateOfBirth, phoneNumber: $phoneNumber, address: $address, profileImage: $profileImage, userId: $userId) {
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
          firstName: formData.firstName,
          lastName: formData.lastName,
          profileImage: formData.profileImage,
          dateOfBirth: formData.dateOfBirth,
          phoneNumber: formData.phoneNumber,
          address: formData.address,
          userId: user._id,
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

      if (responseData.data.createUserProfile) {
        // Handle successful profile creation
        setShowSnackbar(true);
        setSnackbarSuccess(true);
        setSnackbarMessage("Profile has been successfully created");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        // Handle signup error
        setShowSnackbar(true);
        setSnackbarSuccess(false);
        setSnackbarMessage("Unable to Create Profile. Please Try Again");
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error occurred during profile creation:", error);
    }
  };

  return (
    <div className="signup-hero">
      <div className="container">
        <div className="row m-0 p-0 justify-content-center align-items-center">
          <div className="col-md-4">
            <div className="card mt-5 mb-5">
              <div className="card-body">
                <h3 className="mt-5">Create Profile</h3>
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
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
                    <label htmlFor="dateOfBirth">Date Of Birth</label>
                    <DatePicker
                      selected={formData.dateOfBirth}
                      onChange={(date) =>
                        setFormData({ ...formData, dateOfBirth: date })
                      }
                      className={`form-control ${
                        errors.dateOfBirth && "is-invalid"
                      }`}
                    />
                    {errors.dateOfBirth && (
                      <div className="invalid-feedback text-danger pt-3 d-block">
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
                    <img src={formData.profileImage} alt="profile image" />
                  </div>
                  <div className="button text-center">
                    <button type="submit" className="btn btn-lg btn-primary">
                      Create Profile
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

export default CreateProfile;
