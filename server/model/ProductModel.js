const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    uniq_id: String,
    product_name: String,
    retail_price: Number,
    discounted_price: Number,
    image: [
      {
        type: String,
      },
    ],
    description: String,
    product_rating: String,
    overall_rating: String,
    brand: String,
  },
  {
    collection: "products",
    timestamps: true,
  }
);

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = ProductModel;
