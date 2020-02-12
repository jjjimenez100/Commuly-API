const authenticationConfig = {
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY || 'dummy',
};

module.exports = authenticationConfig;
