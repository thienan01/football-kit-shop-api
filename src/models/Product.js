const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const Product = new Schema({
  idCate: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: [true, "You must enter name"],
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  size: [{ type: String, required: true }],
  description: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", Product);
