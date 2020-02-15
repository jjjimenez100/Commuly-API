const logger = require('../modules/logger');

const errorHandler = (error, request, response, next) => {
  const { name = '', code = '', message = '' } = error;
  if (name === 'UnauthorizedError') {
    if (code === 'credentials_required') {
      return response.status(401).send({
        message,
      });
    }

    if (code === 'invalid_token') {
      return response.status(401).send({
        message: 'Token has been tampered',
      });
    }
  }

  if (name === 'ValidationError') {
    return response.status(422).send();
  }

  logger.error(`Server Error. ${error}`);
  if (response.headersSent) {
    return next(error);
  }
  return response.status(500).send({
    message: 'Failed to get a proper response from our services.',
  });
};

module.exports = errorHandler;
