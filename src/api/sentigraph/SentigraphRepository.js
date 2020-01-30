const Sentigraph = require('./SentigraphModel');

const getAllReactionsHistory = () => Sentigraph.find({}).exec();

const getReactionsHistoryByUserIds = (userIds) => Sentigraph.find({
  _id: {
    $in: userIds,
  },
}).exec();

const saveReactionToHistory = (reactionHistory) => Sentigraph.create(reactionHistory);

const deleteOldReactionHistory = (date) => Sentigraph.find({
  createdAt: {
    $lt: date,
  },
});

module.exports = {
  getAllReactionsHistory,
  getReactionsHistoryByUserIds,
  saveReactionToHistory,
  deleteOldReactionHistory,
};
