const mongoose = require('mongoose');
const DB_URI ="mongodb+srv://qaisargill17:qaisar@cluster0.vikyz.mongodb.net/app?retryWrites=true&w=majority&appName=Cluster0"
if(!DB_URI) {
  throw new Error('Please define the environment variable inside .env.<development/production>.local');
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log(`Connected to database `);
  } catch (error) {
    console.error('Error connecting to database: ', error);

    process.exit(1);
  }
}

module.exports = { connectToDatabase };