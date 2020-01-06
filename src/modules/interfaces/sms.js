// TODO: Further testing
const sendSNS = require('../implementations/awsSns');

const sendSMS = (phoneNumber, message, sender) => {
  const messageData = { phoneNumber, message, sender };
  return sendSNS(messageData);
};

module.exports = sendSMS;
