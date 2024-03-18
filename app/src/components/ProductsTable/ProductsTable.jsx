/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 6th March 2024
    Application : FoodWise
    ----------------------------------------------------
*/

import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import placeholderImage from "../../images/avatar.jpeg";
import { Image, Col } from "react-bootstrap";
import { Table, Pagination } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { DELETE_PRODUCT } from "../../apis/productsApi.js";

import "./ProductsTable.css";

const ProductsTable = ({ productsData, handleSnackbar }) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(productsData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = React.useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = productsData.slice(startIndex, endIndex);
  const navigate = useNavigate();
  // Define your mutation hook
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleEdit = (productId) => {
    navigate(`/products/${productId}/edit`);
  };

  const handleDelete = (productId) => {
    // Show confirmation dialog to the user
    if (window.confirm("Are you sure you want to delete this product?")) {
      // User confirmed, proceed with deletion
      deleteProductMutation({
        variables: { productId },
      })
        .then(() => {
          handleSnackbar(true, "Product is deleted Successfully!");
        })
        .catch((error) => {
          // Handle error
          handleSnackbar(false, "Error Deleting Product. Please Try Again");
          console.error("Error deleting product:", error);
        });
    }
  };

  return (
    <div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Sale Price</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Notes</th>
            <th>Expiry</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((product, index) => (
            <tr key={`${product.productName}${index}`}>
              <td>
                <Image src={placeholderImage} className="rounded-circle" />
              </td>
              <td>{product.productName}</td>
              <td>{product.productDescription}</td>
              <td>{product.productPrice}</td>
              <td>{product.productSalePrice}</td>
              <td>{product.productQuantity}</td>
              <td>{product.productStatus ? "In Stock" : "Out of Stock"}</td>
              <td>{product.productNotes}</td>
              <td>
                {new Date(parseInt(product.productExpiry)).toLocaleDateString()}
              </td>
              <td className="d-flex">
                <button
                  className="btn btn-sm btn-primary mr-5 btn-style"
                  onClick={() => handleEdit(product._id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger ml-5 btn-style"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <hr />
      <div className="text-center d-flex justify-content-center">
        <Pagination className="mt-3">
          {[...Array(totalPages)].map((_, page) => (
            <Pagination.Item
              key={page}
              active={page + 1 === currentPage}
              onClick={() => handlePageChange(page + 1)}
              style={{
                backgroundColor:
                  page + 1 === currentPage ? "#28a745" : "#007bff",
                color: "white",
                border: "1px solid #dee2e6",
                margin: "0 2px",
                cursor: "pointer",
              }}
            >
              {page + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
      <hr />
    </div>
  );
};

export default ProductsTable;
