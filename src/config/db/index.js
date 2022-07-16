const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connect() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);

    console.log("connect successfully");
  } catch (error) {
    console.log("connect failure");
  }
}

module.exports = { connect };
