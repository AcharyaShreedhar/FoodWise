import React, { useState, useEffect } from "react";
import "./EditProduct.css";
import { useParams, useNavigate } from "react-router-dom";
import Snackbar from "../Core/Snackbar/Snackbar";

const EditProduct = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    productImage: "default.png",
    productPrice: "",
    productSalePrice: "",
    productQuantity: 10,
    productStatus: true,
    productNotes: "",
    productExpiry: "",
    productCategory: 1,
    productSupplier: 1,
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
  });

  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSuccess, setSnackbarSuccess] = useState("");

  useEffect(() => {
    // Fetch product data and set form data
    const fetchProductData = async () => {
      try {

        const requestBody = {
            query: `
              query Product($productId: ID!) {
                product(id: $productId) {
                  _id,
                  productName,
                  productDescription,
                  productImage,
                  productPrice,
                  productSalePrice,
                  productQuantity,
                  productStatus,
                  productNotes,
                  productExpiry,
                }
              }
            `,
            variables: {
              productId:productId,
            },
          }; 

          const response = await fetch('https://foodwise.minipixai.com/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();
        const productData = responseData.data.product;
console.log('productdata',productData)
        setFormData({
          productName: productData.productName,
          productDescription: productData.productDescription,
          productImage: productData.productImage,
          productPrice: productData.productPrice,
          productSalePrice: productData.productSalePrice,
          productQuantity: productData.productQuantity,
          productStatus: productData.productStatus,
          productNotes: productData.productNotes,
          productExpiry: productData.productExpiry,
          productCategory: productData.productCategory,
          productSupplier: productData.productSupplier,
        });
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [productId]);

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
        newErrors.productName = "product name is required";
        valid = false;
      } 
  
      if (!formData.productDescription) {
        newErrors.productDescription = "product description is required";
        valid = false;
      } 
  
      if (!formData.productImage) {
          newErrors.productImage = "product image is required";
          valid = false;
      } 
  
      if (!formData.productPrice) {
          newErrors.productPrice = "product price is required";
          valid = false;
      } 
      if (!formData.productSalePrice) {
          newErrors.productSalePrice = "product salePrice is required";
          valid = false;
      } 
      if (!formData.productQuantity) {
          newErrors.productQuantity = "product quantity is required";
          valid = false;
      } 
      if (!formData.productStatus) {
          newErrors.productStatus = "product status is required";
          valid = false;
      }
      if (!formData.productNotes) {
          newErrors.productNotes = "product notes is required";
          valid = false;
      }
      if (!formData.productExpiry) {
          newErrors.productExpiry = "product expiry is required";
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
          mutation UpdateProduct($input: ProductInput!) {
            updateProduct(input: $input) {
                _id
                productDescription
                productExpiry
                productImage
                productName
                productNotes
                productPrice
                productQuantity
                productSalePrice
                productStatus
            }
          }
        `,
        variables: {
          input:{productId: productId,
          productName: formData.productName,
          productDescription: formData.productDescription,
          productImage: formData.productImage,
          productPrice: formData.productPrice,
          productSalePrice: formData.productSalePrice,
          productQuantity: parseInt(formData.productQuantity, 10),
          productExpiry: formData.productExpiry,
          productStatus: formData.productStatus,
          productNotes: formData.productNotes,

          }
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

      if (responseData.data.updateProduct) {
        setShowSnackbar(true);
        setSnackbarSuccess(true);
        setSnackbarMessage("Product has been successfully updated");
        setTimeout(() => {
          navigate("/products");
        }, 3000);
      } else {
        setShowSnackbar(true);
        setSnackbarSuccess(false);
        setSnackbarMessage("Unable to update product. Please try again.");
        setTimeout(() => {
          setShowSnackbar(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error occurred during product update:", error);
    }
  };

  return (
    <div className="edit-product-hero">
      <div className="container">
        <div className="row m-0 p-0 justify-content-center align-items-center">
          <div className="col-md-4">
            <div className="card mt-5 mb-5">
              <div className="card-body">
                <h3 className="mt-5">edit product</h3>
                <form onSubmit={handleSubmit} className="p-4">
                <div className="form-group">
                    <label htmlFor="productName">product name</label>
                    <input
                      type="text"
                      className={`form-control ${errors.productName && "is-invalid"}`}
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
                    <label htmlFor="productDescription">product description</label>
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
                    <label htmlFor="productPrice">product price</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.productPrice && "is-invalid"
                      }`}
                      name="productPrice"
                      value={formData.productPrice}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.productPrice && (
                      <div className="invalid-feedback text-danger pt-3">
                        {errors.productPrice}
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="productSalePrice">product sale price</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.productSalePrice && "is-invalid"
                      }`}
                      name="productSalePrice"
                      value={formData.productSalePrice}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.productSalePrice && (
                      <div className="invalid-feedback text-danger pt-3">
                        {errors.productSalePrice}
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="productQuantity">product quantity</label>
                    <input
                      type="number"
                      className={`form-control ${
                        errors.productQuantity && "is-invalid"
                      }`}
                      name="productQuantity"
                      value={formData.productQuantity}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.productQuantity && (
                      <div className="invalid-feedback text-danger pt-3">
                        {errors.productQuantity}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="productStatus">product status</label>
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
                    <label htmlFor="productNotes">product notes</label>
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
                    <label htmlFor="productExpiry">product expiry</label>
                    <input
                      type="text"
                      className={`form-control ${
                        errors.productExpiry && "is-invalid"
                      }`}
                      name="productExpiry"
                      value={formData.productExpiry}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    {errors.productExpiry && (
                      <div className="invalid-feedback text-danger pt-3">
                        {errors.productExpiry}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="productCategory">product category</label>
                    <select
                      className="form-control"
                      name="productCategory"
                      value={formData.productCategory}
                      onChange={handleChange}
                    >
                      <option value="Dairy">Dairy</option>
                      <option value="Vegetables">Vegetables</option>
                      <option value="Meat">Meat</option>
                      <option value="Grains">Grains</option>
                      <option value="Softdrinks">Soft Drinks</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="productSupplier">product supplier</label>
                    <select
                      className="form-control"
                      name="productSupplier"
                      value={formData.productSupplier}
                      onChange={handleChange}
                    >
                      <option value="LF">Liam Foods</option>
                      <option value="Sobeys">Sobeys</option>
                      <option value="Compliments">Compliments</option>
                      
                    </select>
                  </div>
                  <div className="button text-center">
                    <button type="submit" className="btn  sign-in-btn">
                      update product
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

export default EditProduct;
