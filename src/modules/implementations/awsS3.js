const S3 = require('aws-sdk/clients/s3');
/**
 *  AWS doesnt offer an endpoint for updating a specific file, so we
    need to delete the file first from s3 and upload a new one as a
    workaround.
 */

class S3CloudStorage {
  constructor(accessKeyId, secretAccessKey, region) {
    const accessConfig = {
      accessKeyId, secretAccessKey, region,
    };

    this.s3Instance = new S3(accessConfig);
  }

  getFilesFromS3Bucket(bucketName) {
    const queryParams = { Bucket: bucketName };
    return this.s3Instance.listObjectsV2(queryParams).promise();
  }

  getFileFromS3Bucket(bucketName, fileName) {
    const queryParams = { Bucket: bucketName, Key: fileName };
    return this.s3Instance.getObject(queryParams).promise();
  }

  /*
      We don't need to save the incoming file to the server.
      Instead, pass in the request object as the Body, which implements the
      Readable Stream interface.
      Note: The request object should not have been modified by body-parser.

      Permission possible string value:
      "private"
      "public-read"
      "public-read-write"
      "authenticated-read"
      "aws-exec-read"
      "bucket-owner-read"
      "bucket-owner-full-control"
  */
  uploadFileToS3Bucket(bucketName, fileName, fileBuffer) {
    const uploadParams = {
      Bucket: bucketName,
      Body: fileBuffer,
      Key: fileName,
    };
    return this.s3Instance.upload(uploadParams).promise();
  }

  deleteFileFromS3Bucket(bucketName, fileName) {
    const queryParams = { Bucket: bucketName, Key: fileName };
    return this.s3Instance.deleteObject(queryParams).promise();
  }

  // eslint-disable-next-line class-methods-use-this
  getPublicPath(bucketName, fileName) {
    return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
  }
}

module.exports = S3CloudStorage;
