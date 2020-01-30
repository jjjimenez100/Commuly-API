const moment = require('moment-timezone');
const SentigraphRepository = require('./SentigraphRepository');
const { sendSMS } = require('../../modules/interfaces/sms');

const getReactionsHistory = () => SentigraphRepository.getAllReactionsHistory();

const getReactionsHistoryByUsers = (userIds) => SentigraphRepository.getReactionsHistoryByUserIds(
  userIds,
);

const recordReaction = (reactionHistory) => SentigraphRepository.saveReactionToHistory(
  reactionHistory,
);

const deleteOldReactionHistory = () => {
  const currentDate = moment.tz().format('MM/DD/YYYY');
  return SentigraphRepository.deleteOldReactionHistory(currentDate);
};

const notifyUserOnThreshold = (phoneNumber, sender) => {
  const message = 'Please note that reaction history on your team has reached the set threshold.';
  return sendSMS(phoneNumber, message, sender);
};

module.exports = {
  getReactionsHistory,
  getReactionsHistoryByUsers,
  recordReaction,
  deleteOldReactionHistory,
  notifyUserOnThreshold,
};
