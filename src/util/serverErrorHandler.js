const logger = require('../config/winston');

const serverErrorHandler = (error, request, response, next) => {
  logger.error(`Server Error. ${error}`);
  if (response.headersSent) {
    return next(error);
  }
  return response.status(500).send({
    message: 'Failed to get a proper response from our services.',
  });
};

module.exports = serverErrorHandler;
