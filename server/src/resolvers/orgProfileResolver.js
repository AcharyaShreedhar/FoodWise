/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 13th March 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const OrgProfile = require("../models/OrgProfile");

const orgProfileResolver = {
  Query: {
    orgProfiles: async (_, { input }) => {
      try {
        // Extracting search criteria from the input object
        const { orgName } = input;

        // Constructing the base query
        let query = OrgProfile.find();

        // Adding search criteria to the query
        if (orgName) {
          query = query.where("orgName").regex(new RegExp(orgName, "i"));
        }

        // Execute the query
        const orgprofiles = await query.exec();

        return orgprofiles;
      } catch (error) {
        throw new Error("Failed to fetch org profiles");
      }
    },
    orgProfile: async (_, { id }) => {
      try {
        const orgProfile = await OrgProfile.findById(id);
        return orgProfile;
      } catch (error) {
        throw new Error("Failed to fetch org profile details");
      }
    },
  },
  Mutation: {
    createOrgProfile: async (_, args) => {
      const {
        orgName,
        website,
        establishedDate,
        phoneNumber,
        address,
        profileImage,
      } = args;

      try {
        const newOrgProfile = new OrgProfile({
          orgName,
          website,
          establishedDate,
          phoneNumber,
          address,
          profileImage,
        });
        const savedOrgProfile = await newOrgProfile.save();
        return savedOrgProfile;
      } catch (error) {
        console.error("Error creating Org profile:", error);
        throw new Error(`Failed to create Org profile: ${error.message}`);
      }
    },
    updateOrgProfile: async (_, { input }) => {
      const {
        orgProfileId,
        orgName,
        website,
        establishedDate,
        phoneNumber,
        address,
        profileImage,
      } = input;

      try {
        const updatedOrgProfile = await OrgProfile.findByIdAndUpdate(
          orgProfileId,
          {
            $set: {
              orgName,
              website,
              establishedDate,
              phoneNumber,
              address,
              profileImage,
            },
          },
          { new: true }
        );

        return updatedOrgProfile;
      } catch (error) {
        throw new Error("Failed to update org profile");
      }
    },
    deleteOrgProfile: async (_, { orgProfileId }) => {
      try {
        const deletedOrgProfile = await OrgProfile.findByIdAndDelete(
          orgProfileId
        );
        return !!deletedOrgProfile;
      } catch (error) {
        throw new Error("Failed to delete orgProfile");
      }
    },
  },
};

module.exports = orgProfileResolver;
