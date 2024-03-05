import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Routes, Route } from 'react-router-dom';
import Snackbar from '../../components/Core/Snackbar/Snackbar.jsx';
import ProductsTable from '../../components/ProductsTable/ProductsTable.jsx';
import { setProductsData, setProductFilters } from './productsSlice';
import "./ProductsContainer.css";

const ProductsContainer = () => {
  const dispatch = useDispatch();
  const productsData = useSelector(state => state.products.data);
  const filters = useSelector(state => state.products.filters);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSuccess, setSnackbarSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setProductsData([]));
        const requestBody = {
          query: `
            query products($input: ProductSearchInput) {
              products(input: $input) {
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
            input: filters,
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

        if (responseData?.data?.products?.length > 0) {
          dispatch(setProductsData(responseData.data.products));
          setShowSnackbar(true);
          setSnackbarSuccess(true);
          setSnackbarMessage('Data fetch successful!');
          setTimeout(() => {
            setShowSnackbar(false);
          }, 1000);
        } else {
          setShowSnackbar(true);
          setSnackbarSuccess(false);
          setSnackbarMessage('No data found');
          setTimeout(() => {
            setShowSnackbar(false);
          }, 1000);
          console.error('No data found.');
        }
      } catch (error) {
        console.error('Error occurred during data fetch:', error);
        setShowSnackbar(true);
        setSnackbarSuccess(false);
        setSnackbarMessage('Error occurred during data fetch');
        setTimeout(() => {
          setShowSnackbar(false);
        }, 1000);
      }
    };

    fetchData();
  }, [dispatch, filters]);

  return (
    <div className='products-container container'>
      <div className="directory-header">
        <h1>List of Products</h1>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by Product Name"
            value={filters.productName}
            onChange={(e) => dispatch(setProductFilters({ ...filters, productName: e.target.value }))}
          />
          <select
            value={filters.productStatus}
            onChange={(e) => dispatch(setProductFilters({ ...filters, productStatus: e.target.value === 'true' }))} // Convert string to boolean
          >
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>
          <input
            type="date"
            value={filters.productExpiry}
            onChange={(e) => dispatch(setProductFilters({ ...filters, productExpiry: e.target.value }))}
          />
        </div>
        <Link to="/insert">
          <button type="button" className="btn btn-primary">
            Add Product
          </button>
        </Link>
      </div>
      {productsData.length > 0 ? (
        <Routes>
          <Route path="/" element={<ProductsTable productsData={productsData} />} />
        </Routes>
      ) : (
        <p>No data found</p>
      )}
      {showSnackbar && <Snackbar success={snackbarSuccess} message={snackbarMessage} />}
    </div>
  );
};

export default ProductsContainer;
