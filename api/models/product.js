const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//product schema
const ProductSchema = new Schema({
  product_name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  image_url: String,
  created_at: Number,
  updated_at: Number,
});

module.exports = mongoose.model("Product", ProductSchema);
