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
const UserProfile = require("../models/UserProfile");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

// Function to generate a random token for password reset
const generateResetToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

// Function to hash the new password with the salt
const hashNewPassword = (password, salt) => {
  const hash = crypto.createHmac("sha256", salt);
  hash.update(password);
  return hash.digest("hex");
};

// Function to send email
const sendResetTokenByEmail = (email, resetToken) => {
  // Replace the following with your email service provider's SMTP settings
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "spacharya2537@gmail.com",
      pass: "gayj mzph inyi pehu",
    },
  });

  const mailOptions = {
    from: "spacharya2537@gmail.com",
    to: email,
    subject: "Password Reset",
    text: `Your password reset token is: ${resetToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      throw new Error(`Failed to send password reset email: ${error.message}`);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

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
    throw new Error("Stored salt is missing. Unable to verify password.");
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
    // Resolver for initiating password reset
    initiatePasswordReset: async (_, { email }) => {
      try {
        // Find the user by email in the database
        const user = await User.findOne({ email });

        if (!user) {
          throw new Error(
            "User not found. Please check your email or register for an account."
          );
        }

        // Generate a reset token, update the user's resetToken and resetTokenExpiry fields, and save the user
        const resetToken = generateResetToken();
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour
        await user.save();

        // Send the reset token to the user via email
        sendResetTokenByEmail(email, resetToken);

        return true; // Indicates success
      } catch (error) {
        console.error("Error initiating password reset:", error);
        throw new Error(`Failed to initiate password reset: ${error.message}`);
      }
    },

    // Resolver for completing password reset
    completePasswordReset: async (_, { email, resetToken, newPassword }) => {
      try {
        // Find the user by email and reset token in the database
        const user = await User.findOne({
          email,
          resetToken,
          resetTokenExpiry: { $gt: Date.now() }, // Ensure the token is still valid
        });

        if (!user) {
          throw new Error(
            "Invalid or expired reset token. Please initiate the reset process again."
          );
        }

        // Hash the new password with a new salt
        const newSalt = generateSalt();
        const newHashedPassword = hashNewPassword(newPassword, newSalt);

        // Update the user's password, salt, resetToken, and resetTokenExpiry
        user.password = newHashedPassword;
        user.salt = newSalt;
        user.resetToken = null;
        user.resetTokenExpiry = null;

        // Save the updated user to the database
        await user.save();

        return true; // Indicates success
      } catch (error) {
        console.error("Error completing password reset:", error);
        throw new Error(`Failed to complete password reset: ${error.message}`);
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

        // Fetch user profile data based on user ID
        const userProfile = await UserProfile.findOne({ userId: user._id });

        // Combine user and userProfile data and return as a single object
        const userData = {
          ...user.toObject(),
          profile: userProfile ? userProfile.toObject() : null,
        };
     
        // Return the user data as the result of the login query
        return userData;
      } catch (error) {
        // Log and propagate any errors that occur during the login process
        console.error("Error during user login:", error);
        throw new Error(`Failed to log in: ${error.message}`);
      }
    },
  },
};

module.exports = userResolvers;
