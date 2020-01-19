require('dotenv').config();

const express = require('express');
const logger = require('./modules/logger');
const { initAppLoaders } = require('./loaders/app');
const { PORT } = require('./config/api');

const startServer = async () => {
  try {
    const app = express();
    await initAppLoaders(app);
    app.get('/test', (req, res, next) => {
      // eslint-disable-next-line global-require
      const attachSignedCookieToResponse = require('./modules/implementations/awsCloudfront');
      attachSignedCookieToResponse(res);
      res.send('ok');
    });
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
