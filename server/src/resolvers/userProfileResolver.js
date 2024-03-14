/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 13th March 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const UserProfile = require("../models/UserProfile");

const userProfileResolver = {
  Query: {
    userProfiles: async (_, { input }) => {
      try {
        // Extracting search criteria from the input object
        const { firstName } = input;

        // Constructing the base query
        let query = UserProfile.find();

        // Adding search criteria to the query
        if (firstName) {
          query = query.where("firstName").regex(new RegExp(firstName, "i"));
        }

        // Execute the query
        const userprofiles = await query.exec();

        return userprofiles;
      } catch (error) {
        throw new Error("Failed to fetch user profiles");
      }
    },
    userProfile: async (_, { id }) => {
      try {
        const userProfile = await UserProfile.findById(id);
        return userProfile;
      } catch (error) {
        throw new Error("Failed to fetch user profile details");
      }
    },
  },
  Mutation: {
    createUserProfile: async (_, args) => {
      const {
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        address,
        profileImage,
        userId,
      } = args;

      try {
        const newUserProfile = new UserProfile({
          firstName,
          lastName,
          dateOfBirth,
          phoneNumber,
          address,
          profileImage,
          userId,
        });
        const savedUserProfile = await newUserProfile.save();
        return savedUserProfile;
      } catch (error) {
        console.error("Error creating user profile:", error);
        throw new Error(`Failed to create user profile: ${error.message}`);
      }
    },
    updateUserProfile: async (_, { input }) => {
      const {
        userProfileId,
        firstName,
        lastName,
        dateOfBirth,
        phoneNumber,
        address,
        profileImage,
        userId,
      } = input;

      try {
        const updatedUserProfile = await UserProfile.findByIdAndUpdate(
          userProfileId,
          {
            $set: {
              firstName,
              lastName,
              dateOfBirth,
              phoneNumber,
              address,
              profileImage,
              userId,
            },
          },
          { new: true }
        );

        return updatedUserProfile;
      } catch (error) {
        throw new Error("Failed to update user profile");
      }
    },
    deleteUserProfile: async (_, { userProfileId }) => {
      try {
        const deletedUserProfile = await UserProfile.findByIdAndDelete(
          userProfileId
        );
        return !!deletedUserProfile;
      } catch (error) {
        throw new Error("Failed to delete userProfile");
      }
    },
  },
};

module.exports = userProfileResolver;
