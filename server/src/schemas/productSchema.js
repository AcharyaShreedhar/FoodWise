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
    type Product {
        _id: ID!  
        productName: String!
        productDescription: String!
        productImage:String!
        productPrice:String!
        productSalePrice:String!
        productQuantity:Int!
        productStatus:Boolean
        productNotes:String
        productExpiry:String!
   
     }

    type Query {
        dummyQuery: Boolean # Placeholder field to satisfy the requirement
        }

    type Mutation {
        createProduct(
            productName: String!
            productDescription: String!
            productImage:String!
            productPrice:String!
            productSalePrice:String!
            productQuantity:Int!
            productStatus:Boolean
            productNotes:String
            productExpiry:String!
        ): Product,
    
    }

    type Mutation {
        updateProduct(
          input: ProductInput!
        ): Product
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

      type Mutation {
        deleteProduct(productId: ID!): Boolean
      }
`;

module.exports = productSchema;
