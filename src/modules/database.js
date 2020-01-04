const mongoose = require('mongoose');
const MONGO_DB_URL = require('../config/database');

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// replace this with constant and env
const connectToMongoDB = () => mongoose.connect(MONGO_DB_URL, mongooseOptions);
const closeMongoDBConnection = () => mongoose.disconnect();

module.exports = {
  connectToMongoDB,
  closeMongoDBConnection,
};
