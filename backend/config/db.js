const mongoose = require("mongoose");

const connection = async () => {
  try {
    if (!process.env.MONGO_DB) {
      throw new Error("MONGO_DB environment variable is not set");
    }
    const connect = await mongoose.connect(process.env.MONGO_DB);
    console.log("Database connected successfully");
    return connect;
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

module.exports = connection;
