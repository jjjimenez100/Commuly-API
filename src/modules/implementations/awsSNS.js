const SNS = require('aws-sdk/clients/sns');

class SNSTextMessage {
  constructor(accessKeyId, secretAccessKey, region) {
    const accessConfig = {
      accessKeyId, secretAccessKey, region,
    };

    this.snsInstance = new SNS(accessConfig);
  }

  sendSNS(messageData) {
    const {
      message, sender, phoneNumber,
    } = messageData;

    return new Promise((resolve, reject) => {
      const params = {
        Message: message,
        MessageAttributes: {
          'AWS.SNS.SMS.SMSType': {
            DataType: 'String',
            StringValue: messageData.type || 'Transactional',
          },
          'AWS.SNS.SMS.SenderID': {
            DataType: 'String',
            StringValue: sender,
          },
        },
        MessageStructure: 'string',
        PhoneNumber: phoneNumber,
      };

      this.snsInstance.publish(params, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  }
}

module.exports = SNSTextMessage;
