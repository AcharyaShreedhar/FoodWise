/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 2nd April 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const { gql } = require("apollo-server-express");

const donationSchema = gql`
  type Donation {
    _id: ID!
    productName: String!
    productDescription: String!
    productImage: String!
    productQuantity: Int!
    productStatus: Boolean
    productNotes: String
    productExpiry: String!
    donerName:String
    pickUpLocation:String
    contact:String
  }

  type Query {
    
  }

  type Mutation {
    createDonation(
      productName: String!
      productDescription: String!
      productImage: String!
      productQuantity: Int!
      productStatus: Boolean
      productNotes: String
      productExpiry: String!
      donerName:String
      pickUpLocation:String
      contact:String

    ): Donation
  }

  

  input DonationInput {
    productId: ID!
    productName: String
    productDescription: String
    productImage: String
    productQuantity: Int
    productStatus: Boolean
    productNotes: String
    productExpiry: String
    donerName:String
    pickUpLocation:String
    contact:String
  }

`;

module.exports = donationSchema;
