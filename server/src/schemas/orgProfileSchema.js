/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 13th March 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const { gql } = require("apollo-server-express");

const orgProfileSchema = gql`
  type OrgProfile {
    _id: ID!
    orgName: String!
    website: String!
    establishedDate: String!
    phoneNumber: String!
    address: String!
    profileImage: String
    userId:String
  }

  type Query {
    orgProfiles(input: OrgProfileSearchInput): [OrgProfile]!
    orgProfile(id: ID!): OrgProfile
  }

  type Mutation {
    createOrgProfile(
      orgName: String!
      website: String!
      establishedDate: String!
      phoneNumber: String!
      address: String!
      profileImage: String
      userId:String
    ): OrgProfile
  }

  type Mutation {
    updateOrgProfile(input: OrgProfileInput!): OrgProfile
    deleteOrgProfile(orgProfileId: ID!): Boolean
  }

  input OrgProfileInput {
    orgProfileId: ID!
    orgName: String!
    website: String!
    establishedDate: String!
    phoneNumber: String!
    address: String!
    profileImage: String
    userId:String
  }

  input OrgProfileSearchInput {
    orgName: String
  }
`;

module.exports = orgProfileSchema;
