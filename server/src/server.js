/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 2nd Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/


const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
const connectDB = require("./db/db");
const userSchema = require("./schemas/userSchema");
const productSchema= require("./schemas/productSchema");
const userResolvers = require("./resolvers/userResolver");
const productResolvers=require("./resolvers/productResolver");


// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs: [userSchema, productSchema], // Merge type definitions
  resolvers: [userResolvers, productResolvers], // Merge resolvers
  playground: true,
});

const app = express();

async function startServer() {
    try {
      await server.start();
      server.applyMiddleware({ app });
  
      const PORT = process.env.PORT || 4000;
      app.listen(PORT, () => {
        console.log(`FoodWise Server started at http://localhost:${PORT}`);
        console.log(
          `GraphQL Playground available at http://localhost:${PORT}${server.graphqlPath}`
        );
      });
    } catch (error) {
      console.error("Error starting the server:", error);
    }
  }
  connectDB();
  startServer().catch((error) => console.error(error));