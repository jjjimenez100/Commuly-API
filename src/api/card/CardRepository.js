const Card = require('./CardModel');

const getAllCards = () => Card.find({}).exec();

const getCardsByCardType = (cardType) => Card.find({ cardType }).exec();

const getCardsByTeam = (team) => Card.find({ teams: team }).exec();

const getCardsByIds = (ids) => Card.find({
  _id: {
    $in: ids,
  },
}).exec();

const saveCard = (card) => Card.create(card);

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

module.exports = {
  getAllCards,
  getCardsByCardType,
  getCardsByTeam,
  getCardsByIds,
  saveCard,
  addReaction,
  removeReaction,
};
