const mongoose = require('mongoose');

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// replace this with constant and env
const connectToMongoDB = () => mongoose.connect('mongodb://localhost:27017/test', mongooseOptions);

module.exports = connectToMongoDB;
