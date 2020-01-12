const router = require('express').Router();

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
  logger.info(' \u2714 mounted');
};

module.exports = { initRoutes };
