/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 12th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productPrice: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: String,
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
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
