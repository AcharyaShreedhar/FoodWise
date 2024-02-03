/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 2nd Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const mongoose = require('mongoose');
require('dotenv').config({ path: '../.env' });

const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`[${new Date().toLocaleString()}] MongoDB connected successfully`);
    } catch (error) {
      console.error(`[${new Date().toLocaleString()}] MongoDB connection failed:`, error.message);
      process.exit(1);
    }
  };
  
  module.exports = connectDB;
