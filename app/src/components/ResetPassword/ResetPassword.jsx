/*
    ---------------------------------------------------
    Author      : Prashant Sahu
    StudentId   : 8877584
    Date        : 15th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

import React, { useState } from 'react';
import './ResetPassword.css';
import { useNavigate } from 'react-router-dom';
import Snackbar from '../Core/Snackbar/Snackbar'

const ResetPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
  });

  const [errors, setErrors] = useState({
    email: '',
  });

  const [showSnackbar, setShowSnackbar] = useState(false); // State to control Snackbar visibility
  const [snackbarMessage, setSnackbarMessage] = useState(''); // State to set the Snackbar message
  const [snackbarSuccess, setSnackbarSuccess] = useState(''); // State to set the Snackbar message


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear previous errors when user starts typing
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
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
          mutation initiatePasswordReset($email: String!) {
            initiatePasswordReset(email: $email) 
          }
        `,
        variables: {
          email: formData.email,

        }
      };
      const response = await fetch('https://foodwise.minipixai.com/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const responseData = await response.json();
    console.log('responseData', responseData);

    if (responseData.data && responseData.data.initiatePasswordReset) {
      // Handle successful password reset initiation
      setShowSnackbar(true);
      setSnackbarSuccess(true);
      setSnackbarMessage('Reset token is sent to your email successfully!');
      setTimeout(() => {
        navigate('/set');
      }, 1000);
    } else {
      // Handle password reset initiation failure
      setShowSnackbar(true);
      setSnackbarSuccess(false);
      setSnackbarMessage('Reset failed');
      setTimeout(() => {
        setShowSnackbar(false);
      }, 1000);
      console.error('Reset failed.');
    }
  } catch (error) {
    console.error('Error occurred during Reset Password:', error);
  }
};

  return (
    <div className='login-hero'>
      <div className="row row m-0 p-0  row-height justify-content-center align-items-center">
        <div className="col-md-4">
          <div className="card mt-5">
            <div className="card-body">
              <h3 className='mt-5'>Reset Password</h3>
              <form onSubmit={handleSubmit} className="p-4">
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="text"
                    className={`form-control ${errors.email && 'is-invalid'}`}
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete='off'
                  />
                  {errors.email && <div className="invalid-feedback text-danger pt-3">{errors.email}</div>}
                </div>
                
                <div className='button text-center'>
                  <button type="submit" className="btn  sign-in-btn">Reset Password</button>
                </div>
              </form>
              <Snackbar message={snackbarMessage} success={snackbarSuccess} show={showSnackbar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;