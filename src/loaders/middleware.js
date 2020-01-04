const bodyParser = require('body-parser');
const morganBody = require('morgan-body');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('../modules/logger');

// TODO: Add csurf

const initBodyParser = (app) => {
  // Consider doing this on per domain route basis
  app.use(bodyParser.json());
  logger.info(' \u2714 body-parser');
};

const initMorganBody = (app) => {
  const morganBodyOptions = {
    stream: { write: (message) => logger.error(message.trim()) },
    // We wouldn't want to flood our logs with not found and unprocessable requests
    skip: (request, response) => (
      response.statusCode < 400
        || response.statusCode === 422
        || response.statusCode === 404
    ),
  };
  morganBody(app, morganBodyOptions);
  logger.info(' \u2714 morgan-body');
};

const initRateLimiter = (app) => {
  // Consider doing this on per domain route basis
  const windowMs = 15 * 60 * 1000;
  const max = 100;
  const rateLimiter = rateLimit({
    windowMs,
    max,
    handler(request, response) {
      const { ip } = request;
      const errorMessage = `${ip} exceeded ${max} requests within ${windowMs}`;
      response.status(429).send(errorMessage);
    },
  });
  app.use(rateLimiter);
  logger.info(' \u2714 rate-limiter');
};

const initHelmet = (app) => {
  app.use(helmet());
  logger.info(' \u2714 helmet');
};

const initCors = (app) => {
  app.use(cors());
  logger.info(' \u2714 cors');
};

const initMiddlewares = (app) => {
  logger.info('Middlewares');
  initBodyParser(app);
  initMorganBody(app);
  initRateLimiter(app);
  initHelmet(app);
  initCors(app);
};

module.exports = { initMiddlewares };
