/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 12th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

import { gql } from "@apollo/client";

export const ADD_TO_DONATION = gql`
mutation AddToDonation($productId: ID!, $donerName: String, $pickUpLocation: String, $contact: String) {
    addToDonation(
      productId: $productId
      donerName: $donerName
      pickUpLocation: $pickUpLocation
      contact: $contact
    ) {
      _id
      contact
      donerName
      pickUpLocation
      productDescription
      productExpiry
      productImage
      productName
      productNotes
      productQuantity
      productStatus
    }
  },
  
  `;


// Update an existing donation
export const UPDATE_DONATION= gql`
  mutation UpdateDonation($input: DonationInput!) {
    updateDonation(input: $input) {
      _id
      contact
      donerName
      pickUpLocation
      productDescription
      productExpiry
      productImage
      productName
      productNotes
      productQuantity
      productStatus
    }
  }
`;
export const DELETE_DONATION = gql`
mutation DeleteDonation($donationId: ID!) {
  deleteDonation(donationId: $donationId) 
  
}
`;
