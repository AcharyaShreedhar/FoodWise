/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 2nd Feb 2024
    Updated     : 3rd Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const User = require("../models/User");
const crypto = require("crypto");

// Function to generate a random salt
const generateSalt = (length = 16) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

// Function to hash the password with the salt
const hashPassword = (password, salt) => {
  const hash = crypto.createHmac("sha256", salt);
  hash.update(password);
  return hash.digest("hex");
};

const verifyPassword = (enteredPassword, storedHash, storedSalt) => {
   

    if (!storedSalt) {
        throw new Error('Stored salt is missing. Unable to verify password.');
    }
    const enteredHash = hashPassword(enteredPassword, storedSalt);
    const isValid = enteredHash === storedHash;

    return isValid;
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
        console.error("Error creating user account:", error);
        throw new Error(`Failed to create user account: ${error.message}`);
      }
    },
  },
  Query: {
    // Resolver for user login
    loginUser: async (_, args) => {
      // Extracting input parameters from GraphQL query arguments
      const { email, password } = args;

      try {
        // Find the user by email in the database
        const user = await User.findOne({ email });

        // If the user is not found, throw an error
        if (!user) {
          throw new Error(
            "User not found. Please check your email or register for an account."
          );
        }

        // Verify the entered password against the stored hash and salt
        const isPasswordValid = verifyPassword(
          password,
          user.password,
          user.salt
        );

        // If the password is not valid, throw an error
        if (!isPasswordValid) {
          throw new Error(
            "Invalid password. Please check your password and try again."
          );
        }

        // Return the user data as the result of the login query
        return user;
      } catch (error) {
        // Log and propagate any errors that occur during the login process
        console.error("Error during user login:", error);
        throw new Error(`Failed to log in: ${error.message}`);
      }
    },
  },
};

module.exports = userResolvers;
