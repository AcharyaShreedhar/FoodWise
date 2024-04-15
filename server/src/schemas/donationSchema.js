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
    donerName: String
    pickUpLocation: String
    contact: String
  }

  type Query {
    donations(input: DonationSearchInput): [Donation]!
    donation(id: ID!): Donation
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
      donerName: String
      pickUpLocation: String
      contact: String
    ): Donation
  }

  type Mutation {
    updateDonation(input: DonationInput!): Donation
    deleteDonation(donationId: ID!): Boolean
  }
  type Mutation {
    addToDonation(
      productId: ID!
      donerName: String
      pickUpLocation: String
      contact: String
    ): Donation
  }

  input DonationInput {
    donationId: ID!
    productName: String
    productDescription: String
    productImage: String
    productQuantity: Int
    productStatus: Boolean
    productNotes: String
    productExpiry: String
    donerName: String
    pickUpLocation: String
    contact: String
  }
  input DonationSearchInput {
    productName: String
    productStatus: Boolean
    productExpiry: String
  }
`;

module.exports = donationSchema;
