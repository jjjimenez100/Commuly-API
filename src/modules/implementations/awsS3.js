const S3 = require('aws-sdk/clients/s3');
const logger = require('../logger');

/**
 *  AWS doesnt offer an endpoint for updating a specific file, so we
    need to delete the file first from s3 and upload a new one as a
    workaround.
 */

class S3CloudStorage {
  constructor(accessKeys, bucketName) {
    const { accessKeyId, secretAccessKey } = accessKeys;
    const accessConfig = {
      accessKeyId, secretAccessKey, Bucket: bucketName,
    };

    this.s3Instance = new S3(accessConfig);
  }

  async getFilesFromS3Bucket(bucketName, prefix = '') {
    const queryParams = { Bucket: bucketName, prefix };
    try {
      const { Contents: contents } = await this.s3Instance.listObjectsV2(queryParams).promise();
      return contents;
    } catch (error) {
      logger.error(`Failed to get files from s3, ${error}`);
      return [];
    }
  }

  /*
      This is a workaround. We don't need to save the incoming file to the server.
      Instead, pass in the request object as the Body, which implements the
      Readable Stream interface.
      Note: The request object should not have been modified by body-parser.
      see: https://stackoverflow.com/questions/54976097/stream-file-upload-to-s3-via-express-server
  */
  async uploadFileToS3Bucket(bucketName, fileName, request) {
    const uploadParams = { Bucket: bucketName, Body: request, key: fileName };
    try {
      const data = await this.s3Instance.upload(uploadParams).promise();
      return data;
    } catch (error) {
      logger.error(`Failed to upload file to s3 ${error}`);
      return null;
    }
  }

  async deleteFileFromS3Bucket(bucketName, fileName) {
    const queryParams = { Bucket: bucketName, key: fileName };
    try {
      await this.s3Instance.deleteObject(queryParams).promise();
      return true;
    } catch (error) {
      logger.error(`Failed to delete file from s3, ${error}`);
      return false;
    }
  }
}

module.exports = S3CloudStorage;
