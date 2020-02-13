const fileSystem = require('fs');
const logger = require('../modules/logger');

const initVariablesOnExternalFiles = () => {
  logger.info('Environment Variables');
  console.log('env value is: ', process.env.CLOUDFRONT_RSA_KEY);
  console.log('env rsa key path value is: ', process.env.CLOUDFRONT_RSA_KEY_PATH);
  process.env.CLOUDFRONT_RSA_KEY = fileSystem.readFileSync(process.env.CLOUDFRONT_RSA_KEY_PATH);
  logger.info(' \u2714 loaded');
};

module.exports = { initVariablesOnExternalFiles };
