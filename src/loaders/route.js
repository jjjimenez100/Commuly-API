const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../resources/swagger.json');

const logger = require('../modules/logger');
const errorHandler = require('../api/errorHandler');
const { BASE_URL } = require('../config/api');

const UserRoutes = require('../api/user/UserRoutes');
const CardRoutes = require('../api/card/CardRoutes');

router.use(UserRoutes);
router.use(CardRoutes);

const initRoutes = (app) => {
  logger.info('Routes');
  app.use(BASE_URL, router);
  app.use(errorHandler);
  // for swagger documentation
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  logger.info(' \u2714 mounted');
};

module.exports = { initRoutes };
