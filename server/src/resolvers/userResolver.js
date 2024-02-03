/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    ----------------------------------------------------
*/

const User = require('../models/User');

const userResolvers = {
  
  Mutation: {
    createUser: async (_, args) => {
      const { email, password, userType, userStatus } = args;

      try {
        const newUser = new User({
            email, password, userType, userStatus
        });
        const savedUser = await newUser.save();
        return savedUser;
      } catch (error) {
        console.error('Error creating user account:', error);
        throw new Error(`Failed to create user account: ${error.message}`);
      }
    },
    
},
};

module.exports = userResolvers;
