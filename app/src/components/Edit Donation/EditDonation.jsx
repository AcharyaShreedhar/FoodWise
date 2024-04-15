
/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 5th  April 2024
    Application : FoodWise
    ----------------------------------------------------
*/
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Snackbar from "../Core/Snackbar/Snackbar";

const EditDonation = () => {
  const navigate = useNavigate();
  const { donationId } = useParams();
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productImage: "default.png",
    productQuantity: 10,
    productStatus: true,
    productNotes: "",
    productExpiry: new Date(), 
    donerName: "",
    pickUpLocation: "",
    contact: "",
  });

  const [errors, setErrors] = useState({
    productName: "",
    productDescription: "",
    productImage: "",
    productPrice: "",
    productSalePrice: "",
    productQuantity: "",
    productNotes: "",
    productExpiry: "",
    pickUpLocation: "",
    contact: "",
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSuccess, setSnackbarSuccess] = useState("");

  useEffect(() => {
    const fetchDonationData = async () => {
      try {
        const requestBody = {
          query: `
              query Donation($donationId: ID!) {
                donation(id: $donationId) {
                  _id,
                  productName,
                  productDescription,
                  productImage,
                  productQuantity,
                  productStatus,
                  productNotes,
                  productExpiry,
                  donerName,
                  pickUpLocation,
                  contact,
                }
              }
            `,
          variables: {
            donationId: donationId,
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
        console.log(responseData)
        const donationData = responseData.data.donation;

        setFormData({
          productName: donationData.productName,
          productDescription: donationData.productDescription,
          productImage: donationData.productImage,
          productQuantity: donationData.productQuantity,
          productStatus: donationData.productStatus,
          productNotes: donationData.productNotes,
          productExpiry: new Date(parseInt(donationData.productExpiry)),
          donerName: donationData.donerName,
          pickUpLocation: donationData.pickUpLocation,
          contact: donationData.contact,
        });
      } catch (error) {
        console.error("Error fetching donation data:", error);
      }
    };

    fetchDonationData();
  }, [donationId]);

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
        console.log(data);
        setFormData({
          ...formData,
          productImage: data.secure_url,
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
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.productName) {
      newErrors.productName = "Product name is required";
      valid = false;
    }

    if (!formData.productDescription) {
      newErrors.productDescription = "Product Description is required";
      valid = false;
    }

    if (!formData.productImage) {
      newErrors.productImage = "Product Image is required";
      valid = false;
    }

    if (!formData.pickUpLocation) {
      newErrors.pickUpLocation = "Pickup Location is required";
      valid = false;
    }
    if (!formData.contact) {
      newErrors.contact = "Contact is required";
      valid = false;
    } else if (!/^\+?\d{0,3}\d{10}$/.test(formData.contact)) {
      newErrors.contact =
        "Invalid Contact format. Please enter a valid phone number with country code (if applicable) and 10 digits after.";
      valid = false;
    }
    if (!formData.productQuantity) {
      newErrors.productQuantity = "Product Quantity is required";
      valid = false;
    }
    if (!formData.productStatus) {
      newErrors.productStatus = "Product Status is required";
      valid = false;
    }
    if (!formData.productNotes) {
      newErrors.productNotes = "Product Notes is required";
      valid = false;
    }
    if (!formData.productExpiry) {
      newErrors.productExpiry = "Product Expiry is required";
      valid = false;
    } else {
      let expiryString = formData.productExpiry;
      if (formData.productExpiry instanceof Date) {
        const month = formData.productExpiry.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
        const day = formData.productExpiry.getDate();
        const year = formData.productExpiry.getFullYear();
        expiryString = `${month.toString().padStart(2, "0")}/${day
          .toString()
          .padStart(2, "0")}/${year}`;
      }
      if (
        !expiryString.match(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/)
      ) {
        newErrors.productExpiry = "Invalid Expiry Date format (MM/DD/YYYY)";
        valid = false;
      }
    }
    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert("validation failed");
      return;
    }
    try {
      const formattedProductExpiry =
      formData.productExpiry instanceof Date
        ? `${
            formData.productExpiry.getMonth() + 1
          }/${formData.productExpiry.getDate()}/${formData.productExpiry.getFullYear()}`
        : formData.productExpiry;
      const requestBody = {
        query: `
          mutation UpdateDonation($input: DonationInput!) {
            updateDonation(input: $input) {
              _id
              productName
              productDescription
              productImage
              productQuantity
              productStatus
              productNotes
              productExpiry
              donerName
              pickUpLocation
              contact
            }
          }
        `,
        variables: {
          input: {
            donationId: donationId,
            productName: formData.productName,
            productDescription: formData.productDescription,
            productImage: formData.productImage,
            pickUpLocation: formData.pickUpLocation,
            contact: formData.contact,
            productQuantity: parseInt(formData.productQuantity, 10),
            productStatus: formData.productStatus,
            productNotes: formData.productNotes,
            productExpiry: formattedProductExpiry,
            donerName: formData.donerName,
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

      const responseData = await response.json();

      if (responseData.data.updateDonation) {
        setShowSnackbar(true);
        setSnackbarSuccess(true);
        setSnackbarMessage("Donation has been successfully updated");
        setTimeout(() => {
          navigate("/donations");
        }, 3000);
      } else {
        setShowSnackbar(true);
        setSnackbarSuccess(false);
        setSnackbarMessage("Unable to update donation. Please try again.");
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error occurred during donation update:", error);
    }
  };

  return (
    <div className="edit-donation-hero">
      <div className="container">
        <div className="row m-0 p-0 justify-content-center align-items-center">
          <div className="col-md-4">
            <div className="card mt-5 mb-5">
              <div className="card-body">
                <h3 className="mt-5">Edit Donation</h3>
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="form-group">
                    <label htmlFor="productName">Product Name</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.productName && "is-invalid"
                      }`}
                      name="productName"
                      value={formData.productName}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.productName && (
                      <div className="invalid-feedback text-danger pt-3">
                        {errors.productName}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="productDescription">
                      Product Description
                    </label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.productDescription && "is-invalid"
                      }`}
                      name="productDescription"
                      value={formData.productDescription}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.productDescription && (
                      <div className="invalid-feedback text-danger pt-3">
                        {errors.productDescription}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="pickUpLocation">Pick Up Location</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.pickUpLocation && "is-invalid"
                      }`}
                      name="pickUpLocation"
                      value={formData.pickUpLocation}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.pickUpLocation && (
                      <div className="invalid-feedback text-danger pt-3">
                        {errors.pickUpLocation}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact">Contact</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.contact && "is-invalid"
                      }`}
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.contact && (
                      <div className="invalid-feedback text-danger pt-3">
                        {errors.contact}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="productQuantity">Product Quantity</label>
                    <input
                      type="number"
                      className={`form-control ${
                        errors.productQuantity && "is-invalid"
                      }`}
                      name="productQuantity"
                      value={formData.productQuantity}
                      onChange={handleChange}
                      autoComplete="off"
                      min="1"
                    />
                    {errors.productQuantity && (
                      <div className="invalid-feedback text-danger pt-3">
                        {errors.productQuantity}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="productStatus">Product Status</label>
                    <select
                      className="form-control"
                      name="productStatus"
                      value={formData.productStatus}
                      onChange={handleChange}
                    >
                      <option value="instock">In Stock</option>
                      <option value="outofstock">Out of Stock</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="productNotes">Product Notes</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.productNotes && "is-invalid"
                      }`}
                      name="productNotes"
                      value={formData.productNotes}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.productNotes && (
                      <div className="invalid-feedback text-danger pt-3">
                        {errors.productNotes}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="productExpiry">Product Expiry</label>
                    <DatePicker
                      selected={formData.productExpiry}
                      onChange={(date) => {
                        if (
                          date instanceof Date &&
                          !isNaN(date.getTime())
                        ) {
                          setFormData({
                            ...formData,
                            productExpiry: date,
                          });
                        }
                      }}
                      className={`form-control ${
                        errors.productExpiry && "is-invalid"
                      }`}
                    />

                    {errors.productExpiry && (
                      <div className="invalid-feedback text-danger d-block pt-3">
                        {errors.productExpiry}
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="donerName">Donated By:</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.donerName && "is-invalid"
                      }`}
                      name="donerName"
                      value={formData.donerName}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="productImage">Product Image</label>
                    <input
                      type="file"
                      className="form-control text-white "
                      name="productImage"
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
                    <img src={formData.productImage} alt="Product" />
                  </div>
                  <div className="button text-center">
                    <button type="submit" className="btn  sign-in-btn">
                      Update
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

export default EditDonation;
