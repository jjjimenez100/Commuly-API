const fileSystem = require('fs');
const logger = require('../modules/logger');

const initVariablesOnExternalFiles = () => {
  logger.info('Environment Variables');
  process.env.CLOUDFRONT_RSA_KEY = fileSystem.readFileSync(process.env.CLOUDFRONT_RSA_KEY_PATH);
  logger.info(' \u2714 loaded');
};

module.exports = { initVariablesOnExternalFiles };
