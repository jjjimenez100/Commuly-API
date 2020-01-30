const SMSWrapper = require('../implementations/awsSNS');
const logger = require('../logger');
const {
  ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION,
} = require('../../config/aws');

const sms = new SMSWrapper(ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION);

const sendSMS = async (phoneNumber, message, sender) => {
  const messageData = { phoneNumber, message, sender };
  try {
    await sms.sendSNS(messageData);
    return true;
  } catch (error) {
    logger.error(`Failed to send SMS message ${error}`);
    throw error;
  }
};

const sendSMSToMultipleRecipients = async (phoneNumbers, message, sender) => {
  const smsQueue = phoneNumbers.map((phoneNumber) => {
    const messageData = { phoneNumber, message, sender };
    return sms.sendSNS(messageData);
  });

  try {
    await Promise.all(smsQueue);
    return true;
  } catch (error) {
    logger.error(`Failed to send SMS message to one of the recipients ${error}`);
    throw error;
  }
};

module.exports = { sendSMSToMultipleRecipients, sendSMS };
