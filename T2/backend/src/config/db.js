const mongoose = require('mongoose');

const connectDB = async () => {
  const connUri = process.env.MONGO_URI;
  if (!connUri) {
    console.error("Error: MONGO_URI is missing from your environmental configurations.");
    process.exit(1);
  }

  try {
    console.log("Connecting to MongoDB Atlas...");
    const conn = await mongoose.connect(connUri);
    console.log(`MongoDB Connected successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Database connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB };