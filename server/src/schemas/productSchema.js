/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 11th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const { gql } = require("apollo-server-express");

const productSchema = gql`
  type Product {
    _id: ID!
    productName: String!
    productDescription: String!
    productImage: String!
    productPrice: String!
    productSalePrice: String!
    productQuantity: Int!
    productStatus: Boolean
    productNotes: String
    productExpiry: String!
  }

  type Query {
    products(input: ProductSearchInput): [Product]!
    product(id: ID!): Product
  }

  type Mutation {
    createProduct(
      productName: String!
      productDescription: String!
      productImage: String!
      productPrice: String!
      productSalePrice: String!
      productQuantity: Int!
      productStatus: Boolean
      productNotes: String
      productExpiry: String!
    ): Product
  }

  type Mutation {
    updateProduct(input: ProductInput!): Product
    deleteProduct(productId: ID!): Boolean
  }

  input ProductInput {
    productId: ID!
    productName: String
    productDescription: String
    productImage: String
    productPrice: String
    productSalePrice: String
    productQuantity: Int
    productStatus: Boolean
    productNotes: String
    productExpiry: String
  }

  input ProductSearchInput {
    productName: String
    productStatus: Boolean
    productExpiry: String
  }
`;

module.exports = productSchema;
