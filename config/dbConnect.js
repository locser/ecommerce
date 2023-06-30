const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE;

const dbConnect = () => {
  try {
    mongoose.connect(DB).then(() => {
      console.log('Connect to database successfully');
    });
  } catch (error) {
    confirm("Couldn't connect to database");
  }
};

module.exports = dbConnect;
