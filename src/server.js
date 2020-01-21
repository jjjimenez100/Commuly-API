require('dotenv').config();

const express = require('express');
const logger = require('./modules/logger');
const { initAppLoaders } = require('./loaders/app');
const { PORT } = require('./config/api');

const startServer = async () => {
  try {
    const app = express();
    await initAppLoaders(app);
    app.listen(PORT, (error) => {
      if (error) {
        throw error;
      }
      logger.info(`Listening to port ${PORT}`);
    });
  } catch (error) {
    logger.error(`Failed to start server. ${error}`);
  }
};

startServer();
