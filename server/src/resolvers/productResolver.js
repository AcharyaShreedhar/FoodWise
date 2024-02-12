/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 11th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const Product = require("../models/Product");

const productResolvers = {
  Mutation: {
    createProduct: async (_, args) => {
      const {
        productName,
        productDescription,
        productImage,
        productPrice,
        productSalePrice,
        productQuantity,
        productStatus,
        productNotes,
        productExpiry,
      } = args;

      try {
        const newProduct = new Product({
          productName,
          productDescription,
          productImage,
          productPrice,
          productSalePrice,
          productQuantity,
          productStatus,
          productNotes,
          productExpiry,
        });
        const savedProduct = await newProduct.save();
        return savedProduct;
      } catch (error) {
        console.error("Error creating product:", error);
        throw new Error(`Failed to create product: ${error.message}`);
      }
    },
  },
};

module.exports = productResolvers;
