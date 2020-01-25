// TODO: Implement and further testing after getting access to an AWS account
const S3Wrapper = require('../implementations/awsS3');
const logger = require('../logger');
const {
  ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET_NAME,
} = require('../../config/aws');

const s3 = new S3Wrapper(ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION);

const getFiles = async () => {
  try {
    const { Contents: files } = await s3.getFilesFromS3Bucket(S3_BUCKET_NAME);
    const fileNames = files.map(({ Key: fileName }) => fileName);
    return fileNames;
  } catch (error) {
    logger.error(`Failed to get all file names from cloud storage ${error}`);
    throw error;
  }
};

const getFileDetails = async (fileName) => {
  try {
    return await s3.getFileFromS3Bucket(S3_BUCKET_NAME, fileName);
  } catch (error) {
    logger.error(`Failed to get file ${fileName} from cloud storage`);
    throw error;
  }
};

const uploadFile = async (fileName, fileBuffer) => {
  try {
    return await s3.uploadFileToS3Bucket(S3_BUCKET_NAME, fileName, fileBuffer);
  } catch (error) {
    logger.error(`Failed to upload request file to cloud storage ${error}`);
    throw error;
  }
};

const deleteFile = async (fileName) => {
  try {
    return await s3.deleteFileFromS3Bucket(S3_BUCKET_NAME, fileName);
  } catch (error) {
    logger.error(`Failed to delete ${fileName} from cloud storage, ${error}`);
    throw error;
  }
};

const getPublicPath = (fileName) => s3.getPublicPath(S3_BUCKET_NAME, fileName);

module.exports = {
  getFiles, getFileDetails, getPublicPath, uploadFile, deleteFile,
};
