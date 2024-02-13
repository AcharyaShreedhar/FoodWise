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
    products: async () => {
      try {
        const products = await Product.find();
        return products.map((product) => ({
          _id: product._id.toString(),
          productName: product.productName,
          productDescription: product.productDescription,
          productImage: product.productImage,
          productPrice: product.productPrice,
          productSalePrice: product.productSalePrice,
          productQuantity: product.productQuantity,
          productStatus: product.productStatus,
          productNotes: product.productNotes,
          productExpiry: product.productExpiry,
        }));
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
