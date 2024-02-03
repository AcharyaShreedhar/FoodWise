/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Course      : Advanced Full Stack Programming
    Application : PulseCrew-Employee Management System
    ----------------------------------------------------
*/

const User = require('../models/User');
const crypto = require('crypto');

// Function to generate a random salt
const generateSalt = (length = 16) => {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  };
  
  // Function to hash the password with the salt
  const hashPassword = (password, salt) => {
    const hash = crypto.createHmac('sha256', salt);
    hash.update(password);
    return hash.digest('hex');
  };
  

  const userResolvers = {
    Mutation: {
      createUser: async (_, args) => {
        const { email, password, userType, userStatus } = args;
  
        try {
             // Generate a random salt for password hashing
          const salt = generateSalt();
          //Hash the password with the generated salt
          const hashedPassword = hashPassword(password, salt);
        
           // Create a new User instance with the hashed password and other details
          const newUser = new User({
            email,
            password: hashedPassword,
            salt,
            userType,
            userStatus,
          });
         // Save the new user to the database
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
