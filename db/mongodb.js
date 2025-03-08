const mongoose = require('mongoose');

if(!process.env.DB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.<development/production>.local');
}

const connectToDatabase = async () => {
  try {
      await mongoose.connect(process.env.DB_URI);

    console.log(`Connected to database `);
  } catch (error) {
    console.error('Error connecting to database: ', error);

    process.exit(1);
  }
}

module.exports = { connectToDatabase };