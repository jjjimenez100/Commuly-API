// wrap aws sns calls
const sendSNS = require('./awsSns');

const sendSMS = (phoneNumber, message, sender) => {
  const messageData = { phoneNumber, message, sender };
  return sendSNS(messageData);
};

module.exports = sendSMS;
