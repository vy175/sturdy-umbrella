const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('./models/User');
const { connectDB } = require('./config/db');

const seedDatabase = async () => {
  try {
    // 1. Establish the connection to MongoDB Atlas
    await connectDB();

    // 2. Read and parse the users.json dataset from the root folder
    const usersPath = path.join(__dirname, '../users.json');
    if (!fs.existsSync(usersPath)) {
      throw new Error(`users.json file not found at: ${usersPath}`);
    }

    const rawData = fs.readFileSync(usersPath, 'utf-8');
    const users = JSON.parse(rawData);

    
    await User.deleteMany({});
    const createdUsers = await User.insertMany(users);

    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();