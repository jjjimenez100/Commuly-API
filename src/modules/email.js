const { createTransport } = require('nodemailer');
const SNS = require('aws-sdk/clients/sns');

class SNSEmail {
  constructor(accessKeyId, secretAccessKey, region) {
    const accessConfig = {
      accessKeyId, secretAccessKey, region,
    };

    this.snsInstance = new SNS(accessConfig);
    this.transporter = createTransport({
      SES: this.snsInstance,
    });
  }

  sendTextEmail(messageDetails) {
    return this.transporter.sendMail(messageDetails);
  }
}

module.exports = SNSEmail;
