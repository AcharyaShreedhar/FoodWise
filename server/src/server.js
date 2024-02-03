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


// Define your GraphQL schema
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Define your resolvers
const resolvers = {
  Query: {
    hello: () => "Hello, FoodWise!",
  },
};

// Create an Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
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