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
    salt:String
    userType: String!
    userStatus: Boolean
  }

  type Query {
    users: [User]!
    # Query to log in a user
    loginUser(email: String!, password: String!): User
    
  }

  type Mutation {
    createUser(
        email: String!
        password: String!
        salt:String
        userType: String!
        userStatus: Boolean
    ): User
    initiatePasswordReset(email: String!): Boolean
    completePasswordReset(
      email: String!
      newPassword: String!
      resetToken: String!
    ): Boolean
    
  }
`;

module.exports = userSchema;
