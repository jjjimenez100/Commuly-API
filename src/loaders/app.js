const figlet = require('figlet');
const logger = require('../modules/logger');
const { initDatabaseConnection } = require('./database');
const { initMiddlewares } = require('./middleware');
const { initRoutes } = require('./route');
const { initVariablesOnExternalFiles } = require('./variable');

const initAppLoaders = async (app) => {
  logger.info('Initializing server modules...');

  try {
    initVariablesOnExternalFiles();
    initMiddlewares(app);
    initRoutes(app);
    await initDatabaseConnection(app);
  } catch (error) {
    logger.error(`Failed to initialize some of the server modules. ${error}`);
  }

  logger.info('Done initializing server modules.');
  figlet('Commuly-API v1', (error, data) => {
    logger.info(data);
  });
};

module.exports = { initAppLoaders };
