/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 13th March 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const mongoose = require("mongoose");

const orgProfileSchema = new mongoose.Schema({
  orgName: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  establishedDate: {
    type: Date,
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  profileImage: {
    type: String,
  },
});

const OrgProfile = mongoose.model("OrgProfile", orgProfileSchema);

module.exports = OrgProfile;
