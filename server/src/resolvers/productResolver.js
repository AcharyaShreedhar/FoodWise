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
        const { productName, productStatus, productExpiry } = input;

        // Constructing the base query
        let query = Product.find();

        // Adding search criteria to the query
        if (productName) {
          query = query
            .where("productName")
            .regex(new RegExp(productName, "i"));
        }
        if (productStatus !== undefined) {
          query = query.where("productStatus").equals(productStatus);
        }
        if (productExpiry) {
          query = query.where("productExpiry").equals(productExpiry);
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

    generateDynamicPrice: async (_, { productId }) => {
      try {
        // Fetch the product from the database
        const product = await Product.findById(productId);

        // Calculate dynamic price using your dynamic pricing algorithm
        const dynamicPrice = calculateDynamicPrice(product);

        // Update productSalePrice in the product object
        product.productSalePrice = dynamicPrice;

        // Save the updated product back to the database
        await product.save();

        // Return the dynamic price
        return dynamicPrice;
      } catch (error) {
        console.error("Error calculating dynamic price:", error);
        throw new Error("Failed to calculate dynamic price");
      }
    },
  },
};

//Function to calculate dynamic price based on expiry date and quantity
function calculateDynamicPrice(product) {
  const { productExpiry, productQuantity } = product;

  // Calculate days to expiry
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const daysToExpiry =
    (new Date(productExpiry) - new Date()) / millisecondsInDay;

  // Define pricing rules
  const basePrice = parseFloat(product.productPrice); // Base price from the product
  const priceReductionPerDay = 0.1; // Price reduction per day as expiry date approaches
  const priceReductionPerUnit = 0.05; // Price reduction per unit of quantity

  // Calculate price based on expiry date and quantity
  let dynamicPrice = basePrice;
  if (daysToExpiry <= 30) {
    dynamicPrice -= basePrice * priceReductionPerDay * (30 - daysToExpiry);
  }
  if (daysToExpiry <= 30 && productQuantity > 0) {
    dynamicPrice -= basePrice * priceReductionPerUnit * productQuantity;
  }

  // Ensure dynamic price is at least 10% of the base price
  const lowestSalePrice = 0.1 * basePrice;
  dynamicPrice = Math.max(dynamicPrice, lowestSalePrice);

  return dynamicPrice.toFixed(2); // Round to two decimal places
}

module.exports = productResolvers;
