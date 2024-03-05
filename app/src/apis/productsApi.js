/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 12th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation CreateProduct(
    $productName: String!
    $productDescription: String!
    $productImage: String!
    $productPrice: String!
    $productSalePrice: String!
    $productQuantity: Int!
    $productStatus: Boolean
    $productNotes: String
    $productExpiry: String!
  ) {
    createProduct(
      productName: $productName
      productDescription: $productDescription
      productImage: $productImage
      productPrice: $productPrice
      productSalePrice: $productSalePrice
      productQuantity: $productQuantity
      productStatus: $productStatus
      productNotes: $productNotes
      productExpiry: $productExpiry
    ) {
      productName
      productDescription
      productImage
      productPrice
      productSalePrice
      productQuantity
      productStatus
      productNotes
      productExpiry
    }
  }
`;

// Update an existing product
export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($input: ProductInput!) {
    updateProduct(input: $input) {
      _id
      productName
      productDescription
      productImage
      productPrice
      productSalePrice
      productQuantity
      productStatus
      productNotes
      productExpiry
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($productId: ID!) {
    deleteProduct(productId: $productId) 
    
  }
`;
