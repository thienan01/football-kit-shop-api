const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const Category = new Schema({
  cateName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Category", Category);
