const Card = require('./CardModel');

const getAllCards = () => Card.find({});

const getCardsByCardType = (cardType) => Card.find({ cardType });

const getCardsByTeam = (team) => Card.find({ teams: team });

const saveCard = (card) => Card.create(card);

module.exports = {
  getAllCards, getCardsByCardType, getCardsByTeam, saveCard,
};
