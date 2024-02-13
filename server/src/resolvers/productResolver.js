/*
    ---------------------------------------------------
    Author      : Shree Dhar Acharya
    StudentId   : 8899288
    Date        : 11th Feb 2024
    Application : FoodWise
    ----------------------------------------------------
*/

const Product = require("../models/Product");

const productResolvers = {
  Query: {
    products: async (_, { input }) => {
      try {
        // Extracting search criteria from the input object
        const {
          productName,
          productStatus,
          productExpiry,
        } = input;

        // Constructing the base query
        let query = Product.find();

        // Adding search criteria to the query
        if (productName) {
          query = query.where('productName').regex(new RegExp(productName, 'i'));
        }
        if (productStatus !== undefined) {
          query = query.where('productStatus').equals(productStatus);
        }
        if (productExpiry) {
          query = query.where('productExpiry').equals(productExpiry);
        }

        // Execute the query
        const products = await query.exec();

        return products;
      } catch (error) {
        throw new Error("Failed to fetch products");
      }
    },
    product: async (_, { id }) => {
      try {
        const product = await Product.findById(id);
        return product;
      } catch (error) {
        throw new Error("Failed to fetch product details");
      }
    },
  },
  Mutation: {
    createProduct: async (_, args) => {
      const {
        productName,
        productDescription,
        productImage,
        productPrice,
        productSalePrice,
        productQuantity,
        productStatus,
        productNotes,
        productExpiry,
      } = args;

      try {
        const newProduct = new Product({
          productName,
          productDescription,
          productImage,
          productPrice,
          productSalePrice,
          productQuantity,
          productStatus,
          productNotes,
          productExpiry,
        });
        const savedProduct = await newProduct.save();
        return savedProduct;
      } catch (error) {
        console.error("Error creating product:", error);
        throw new Error(`Failed to create product: ${error.message}`);
      }
    },
    updateProduct: async (_, { input }) => {
      const {
        productId,
        productName,
        productDescription,
        productImage,
        productPrice,
        productSalePrice,
        productQuantity,
        productStatus,
        productNotes,
        productExpiry,
      } = input;

      try {
        const updatedProduct = await Product.findByIdAndUpdate(
          productId,
          {
            $set: {
              productName,
              productDescription,
              productImage,
              productPrice,
              productSalePrice,
              productQuantity,
              productStatus,
              productNotes,
              productExpiry,
            },
          },
          { new: true }
        );

        return updatedProduct;
      } catch (error) {
        throw new Error("Failed to update product");
      }
    },
    deleteProduct: async (_, { productId }) => {
      try {
        const deletedProduct = await Product.findByIdAndDelete(productId);
        return !!deletedProduct;
      } catch (error) {
        throw new Error("Failed to delete product");
      }
    },
  },
};

module.exports = productResolvers;
