const awsConfig = {
  AWS_REGION: process.env.AWS_REGION || 'dummy',
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID || 'dummy',
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || 'dummy',
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || 'dummy',
};

module.exports = awsConfig;
