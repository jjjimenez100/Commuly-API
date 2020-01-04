const S3 = require('aws-sdk/clients/s3');
const logger = require('../../config/winston');

/**
 *  AWS doesnt offer an endpoint for updating a specific file, so we
    need to delete the file first from s3 and upload a new one as a
    workaround.
 */

const createNewS3Instance = (accessKeys, bucketName) => {
  const { accessKeyId, secretAccessKey } = accessKeys;
  const accessConfig = {
    accessKeyId, secretAccessKey, Bucket: bucketName,
  };
  return new S3(accessConfig);
};

const getFilesFromS3Bucket = async (s3Instance, bucketName, prefix = '') => {
  const queryParams = { Bucket: bucketName, prefix };
  try {
    const { Contents: contents } = await s3Instance.listObjectsV2(queryParams).promise();
    return contents;
  } catch (error) {
    logger.error(`Failed to get files from s3, ${error}`);
    return [];
  }
};

/*
    This is a workaround. We don't need to save the incoming file to the server.
    Instead, pass in the request object as the Body, which implements the
    Readable Stream interface.
    Note: The request object should not have been modified by body-parser.
    see: https://stackoverflow.com/questions/54976097/stream-file-upload-to-s3-via-express-server
*/
const uploadFileToS3Bucket = async (s3Instance, bucketName, fileName, request) => {
  const uploadParams = { Bucket: bucketName, Body: request, key: fileName };
  try {
    const data = await s3Instance.upload(uploadParams).promise();
    return data;
  } catch (error) {
    logger.error(`Failed to upload file to s3 ${error}`);
    return null;
  }
};

const deleteFileFromS3Bucket = async (s3Instance, bucketName, fileName) => {
  const queryParams = { Bucket: bucketName, key: fileName };
  try {
    await s3Instance.deleteObject(queryParams).promise();
    return true;
  } catch (error) {
    logger.error(`Failed to delete file from s3, ${error}`);
    return false;
  }
};

module.exports = {
  createNewS3Instance, getFilesFromS3Bucket, uploadFileToS3Bucket, deleteFileFromS3Bucket,
};
