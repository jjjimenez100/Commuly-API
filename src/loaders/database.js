const { connectToMongoDB } = require('../modules/database');
const logger = require('../modules/logger');

const initDatabaseConnection = async () => {
  try {
    logger.info('Database Connection');
    await connectToMongoDB();
    logger.info(' \u2714 established');
  } catch (error) {
    logger.error(`Failed to establish database connection. This may cause succeeding service calls to fail. ${error}`);
    throw error;
  }
};

module.exports = { initDatabaseConnection };
