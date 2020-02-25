const moment = require('moment-timezone');
const Card = require('./CardModel');

const getAllCards = () => Card.find({}).exec();

const getCardById = (_id) => Card.find({ _id }).exec();

const getCardsByCardType = (cardType) => Card.find({ cardType }).exec();

const getCardsByTeam = (team, page, limit) => Card
  .find({ team })
  .skip(page * limit)
  .limit(limit)
  .exec();

const getCardsByIds = (ids) => Card.find({
  _id: {
    $in: ids,
  },
})
  .exec();

const saveCard = (card) => Card.create({
  ...card,
  createdDate: moment.tz('Asia/Manila').format('MM/DD/YYYY hh:mm:ss A'),
});

const updateAndOverwriteCard = (cardId, card) => Card.findOneAndUpdate(
  {
    _id: cardId,
  },
  {
    ...card,
  },
  {
    overwrite: true,
  },
);

const addReaction = (cardId, reactionType, userId) => Card.findOneAndUpdate(
  {
    _id: cardId,
  },
  {
    $push: {
      [`reactions.${reactionType.toLowerCase()}`]: userId,
    },
  },
  { useFindAndModify: false },
);

const removeReaction = (cardId, reactionType, userId) => Card.findOneAndUpdate(
  {
    _id: cardId,
  },
  {
    $pull: {
      [`reactions.${reactionType.toLowerCase()}`]: userId,
    },
  },
  { useFindAndModify: false },
);

const addResponse = (cardId, response, questionCardType) => Card.findOneAndUpdate(
  {
    _id: cardId,
  },
  {
    $push: {
      [`${questionCardType}.responses`]: response,
    },
  },
  { useFindAndModify: false },
);

const removeResponse = (cardId, userId, questionCardType) => Card.findOneAndUpdate(
  {
    _id: cardId,
  },
  {
    $pull: {
      [`${questionCardType}.responses`]: {
        userId,
      },
    },
  },
  { useFindAndModify: false },
);

const removeResponses = (cardId, questionCardType) => Card.findOneAndUpdate(
  {
    _id: cardId,
  },
  {
    $set: {
      [`${questionCardType}.responses`]: [],
    },
  },
  { useFindAndModify: false },
);

module.exports = {
  getAllCards,
  getCardById,
  getCardsByCardType,
  getCardsByTeam,
  getCardsByIds,
  updateAndOverwriteCard,
  saveCard,
  addReaction,
  removeReaction,
  addResponse,
  removeResponse,
  removeResponses,
};
