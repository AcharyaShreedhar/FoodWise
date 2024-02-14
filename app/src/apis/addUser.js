/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 11th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/
import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $userType: String!
  ) {
    createUser(
      email: $email
      password: $password
      userType: $userType
    ) {
      email
      password
      userType
    }
  }
`;
