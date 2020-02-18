const mongoose = require('mongoose');
const figlet = require('figlet');
const logger = require('../modules/logger');
const { connectToMongoDB, closeMongoDBConnection } = require('../modules/database');

const drop = async (...collections) => {
  const dropPromises = [];

  collections.map((collection, index) => {
    logger.info(`${index}. Added ${collection} for drop collections queue`);
    return mongoose.connection.db.dropCollection(collection);
  });

  try {
    await Promise.all(dropPromises);
    logger.info(`Successfully dropped all collections: ${collections.join(',')}`);
    return true;
  } catch (error) {
    logger.error(`Failed to drop collections, ${error}`);
    return false;
  }
};

const dropCollections = async (...collections) => {
  figlet('Drop Collection Script', async (err, data) => {
    logger.info(data);
    try {
      if (mongoose.connection.readyState === 0) {
        // connect to mongodb
        await connectToMongoDB();
      }
      await drop(collections);
      await closeMongoDBConnection();
    } catch (error) {
      logger.error(`Failed to run drop collections script, ${error}`);
      if (mongoose.connection.readyState === 2) {
        await closeMongoDBConnection();
      }
    }
  });
};

module.exports = { dropCollections };
