/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 2nd April 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const Donation = require("../models/Donation");

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
        contact
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
        contact
        });
        const savedDonation = await newDonation.save();
        return savedDonation;
      } catch (error) {
        console.error("Error adding donation:", error);
        throw new Error(`Failed to create donation: ${error.message}`);
      }
    }
    },
};

module.exports = donationResolvers;
