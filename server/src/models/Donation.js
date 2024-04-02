/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 2nd  April 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
  },
  productStatus: {
    type: Boolean,
    default: false,
  },
  productNotes: {
    type: String,
    required: true,
  },
  productExpiry: {
    type: Date,
  },
  donerName:{
    type:String,
  },
  pickUpLocation:{
    type:String,
  },
  contact:{
    type:String,
  }
});

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
