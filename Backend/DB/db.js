const mongoose = require("mongoose");

const DB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected...");
  } catch (err) {
    console.log("Error: ", err);
  }
};

module.exports = DB;
