/*
    ---------------------------------------------------
    Author      : Prashant Sahu
    StudentId   : 8877584
    Date        : 7th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

import React from 'react';
import './Snackbar.css';

const Snackbar =({message,sucess,show})=>{
    return (
        <div className = {`snackbar ${success ? 'success' : 'error'} ${show ? 'show' :''}`}>
            {message}
        </div>
    );
};

export default Snackbar;