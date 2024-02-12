/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 11th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const { gql } = require('apollo-server-express');

const productSchema = gql`
type User {
    _id: ID!  
    productName: String!
    productDescription: String!
    productImage:String!
    productPrice:String!
    productSalePrice:String!
    ProductQuantity:Int!
    productStatus:Boolean
    productNotes:String
    productExpiry:Date!
   
  }

  type Query {
  }

  type Mutation {
    createProduct(
        productName: String!
        productDescription: String!
        productImage:String!
        productPrice:String!
        productSalePrice:String!
        ProductQuantity:Int!
        productStatus:Boolean
        productNotes:String
        productExpiry:Date!
    ): Product,
    
  }
`;

module.exports = productSchema;
