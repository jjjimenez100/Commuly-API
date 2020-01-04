const awsConfig = {
  region: process.env.AWS_REGION || 'dummy',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'dummy',
  secretAccessKey: process.env.secretAccessKey || 'dummy',
  s3PublicURL: process.env.AWS_S3_PUBLIC_URL || 'dummy',
  bucket: process.env.AWS_S3_BUCKET || 'dummy',
};

module.exports = awsConfig;
