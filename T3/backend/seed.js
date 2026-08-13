require('dotenv').config();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const { connectDB } = require('./src/config/db');
const Person = require('./src/models/Person');
const Family = require('./src/models/Family');

const seedDatabase = async () => {
  try {
    // 1. Establish the connection to MongoDB
    await connectDB();

    // 2. Read and parse the JSON datasets
    const personsPath = path.join(__dirname, 'persons.json');
    const familiesPath = path.join(__dirname, 'families.json');

    if (!fs.existsSync(personsPath) || !fs.existsSync(familiesPath)) {
      throw new Error('Data files (persons.json or families.json) not found!');
    }

    const personsData = JSON.parse(fs.readFileSync(personsPath, 'utf-8'));
    const familiesData = JSON.parse(fs.readFileSync(familiesPath, 'utf-8'));

    // 3. Clear existing data
    console.log('Clearing existing data...');
    await Person.deleteMany({});
    await Family.deleteMany({});

    // 4. Insert data
    console.log('Seeding Persons...');
    await Person.insertMany(personsData);

    console.log('Seeding Families...');
    const createdFamilies = await Family.insertMany(familiesData);

    console.log('Updating Person two-way references...');
    for (const family of createdFamilies) {
      if (family.parents && family.parents.length > 0) {
        await Person.updateMany(
          { _id: { $in: family.parents } },
          { $push: { parentInFamilies: family._id } }
        );
      }
      if (family.children && family.children.length > 0) {
        await Person.updateMany(
          { _id: { $in: family.children } },
          { $push: { childInFamilies: family._id } }
        );
      }
    }

    console.log('Seed data successfully added!');
    mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
