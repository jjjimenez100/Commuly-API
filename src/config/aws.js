const getCloudfrontKey = () => process.env.CLOUDFRONT_RSA_KEY || 'dummy';

const awsConfig = {
  AWS_REGION: process.env.AWS_REGION || 'dummy',
  ACCESS_KEY_ID: process.env.ACCESS_KEY_ID || 'dummy',
  SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY || 'dummy',
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME || 'dummy',
  CLOUDFRONT_DISTRIBUTION_ID: process.env.CLOUDFRONT_DISTRIBUTION_ID || 'dummy',
  CLOUDFRONT_RSA_KEY: getCloudfrontKey,
  CLOUDFRONT_URL: process.env.CLOUDFRONT_URL || 'dummy',
  SES_SMTP_USERNAME: process.env.SES_SMTP_USERNAME || 'dummy',
  SES_SMTP_PASSWORD: process.env.SES_SMTP_PASSWORD || 'dummy',
};

module.exports = awsConfig;
