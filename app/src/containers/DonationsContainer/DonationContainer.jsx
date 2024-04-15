/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 5th  April 2024
    Application : FoodWise
    ----------------------------------------------------
*/


import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Snackbar from '../../components/Core/Snackbar/Snackbar.jsx';
import { setProductsData, setProductFilters } from '../ProductsContainer/productsSlice';
import DonationsTable from '../../components/DonationsTable/DonationsTable.jsx';

const DonationsContainer = () => {
  const dispatch = useDispatch();
  const donationsData = useSelector(state => state.products.data);
  const filters = useSelector(state => state.products.filters);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSuccess, setSnackbarSuccess] = useState(false);


  const navigate = useNavigate();


    const fetchData = async () => {
      try {
        dispatch(setProductsData([]));
        const requestBody = {
          query: `
            query donations($input: DonationSearchInput) {
              donations(input: $input) {
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
            input: filters,
          },
        };

        const response = await fetch('https://foodwiseapi.onrender.com/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        const responseData = await response.json();

        if (responseData?.data?.donations?.length > 0) {
          dispatch(setProductsData(responseData.data.donations));
        } else {
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

useEffect(() => {
  fetchData();
}, [dispatch, filters]);

  const handleSnackbar = (success, message) => {
    setSnackbarSuccess(success);
    setSnackbarMessage(message);
    setShowSnackbar(true);
    setTimeout(() => {
        setShowSnackbar(false); 
        fetchData();
      }, 1000); 
   
  };

  return (
    <div className='products-container container'>
         <Snackbar message={snackbarMessage} success={snackbarSuccess} show={showSnackbar} />
      <div className="directory-header">
        <h1>List of Donations</h1>
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
        <Link to="/addDonation">
          <button type="button" className="btn btn-primary">
            Add Donation
          </button>
        </Link>
      </div>
      {donationsData.length > 0 ? (
        <Routes>
          <Route path="/" element={<DonationsTable donationsData={donationsData} handleSnackbar={handleSnackbar} />} />
        </Routes>
      ) : (
        <p className='pt-5 pb-5'>No Items found in the Donations List</p>
      )}
    
    </div>
  );
};

export default DonationsContainer;
