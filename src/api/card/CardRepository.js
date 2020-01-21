const Card = require('./CardModel');

const getAllCards = () => Card.find({});

const getCardsByCardType = (cardType) => Card.find({ cardType });

const getCardsByTeam = (team) => Card.find({ teams: team });

const getCardsByIds = (ids) => Card.find({
  _id: {
    $in: ids,
  },
});

const saveCard = (card) => Card.create(card);

module.exports = {
  getAllCards, getCardsByCardType, getCardsByTeam, getCardsByIds, saveCard,
};
