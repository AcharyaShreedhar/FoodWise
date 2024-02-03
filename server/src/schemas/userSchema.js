/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 2nd Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const { gql } = require('apollo-server-express');

const userSchema = gql`
type User {
    _id: ID!  
    email: String!
    password: String!
    userType: String!
    userStatus: Boolean
  }

  type Query {
    users: [User]!
    
  }

  type Mutation {
    createUser(
        email: String!
        password: String!
        userType: String!
        userStatus: Boolean
    ): User,
    
  }
`;

module.exports = userSchema;
