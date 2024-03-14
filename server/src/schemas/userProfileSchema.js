/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 13th March 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const { gql } = require("apollo-server-express");

const userProfileSchema = gql`
  type UserProfile {
    _id: ID!
    firstName: String!
    lastName: String!
    dateOfBirth: String!
    phoneNumber: String!
    address: String!
    profileImage: String
    userId:String
  }

  type Query {
    userProfiles(input: UserProfileSearchInput): [UserProfile]!
    userProfile(id: ID!): UserProfile
  }

  type Mutation {
    createUserProfile(
      firstName: String!
      lastName: String!
      dateOfBirth: String!
      phoneNumber: String!
      address: String!
      profileImage: String
      userId:String
    ): UserProfile
  }

  type Mutation {
    updateUserProfile(input: UserProfileInput!): UserProfile
    deleteUserProfile(userProfileId: ID!): Boolean
  }

  input UserProfileInput {
    userProfileId: ID!
    firstName: String
    lastName: String
    dateOfBirth: String
    phoneNumber: String
    address: String
    profileImage: String
    userId:String
  }

  input UserProfileSearchInput {
    firstName: String
  }
`;

module.exports = userProfileSchema;
