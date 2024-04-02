/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 2nd April 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const Donation = require("../models/Donation");
const Product = require("../models/Product");

const donationResolvers = {
  Mutation: {
    createDonation: async (_, args) => {
      const {
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
      } = args;

      try {
        const newDonation = new Donation({
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
        });
        const savedDonation = await newDonation.save();
        return savedDonation;
      } catch (error) {
        console.error("Error adding donation:", error);
        throw new Error(`Failed to create donation: ${error.message}`);
      }
    },
    addToDonation: async (_, { productId,donerName,pickUpLocation,contact }) => {
        try {
          // Fetch the product from the database
          const product = await Product.findById(productId);
  
          const donation= new Donation({
          productName:product.productName,
          productDescription:product.productDescription,
          productImage:product.productImage,
          productQuantity:product.productQuantity,
          productStatus:product.productStatus,
          productNotes:product.productNotes,
          productExpiry:product.productExpiry,
          donerName,
          pickUpLocation,
          contact,
          })
          const savedDonation = await donation.save();
          return savedDonation;
        } catch (error) {
            console.error("Error adding donation:", error);
            throw new Error(`Failed to add donation: ${error.message}`);
        }
    },
  },
};

module.exports = donationResolvers;
