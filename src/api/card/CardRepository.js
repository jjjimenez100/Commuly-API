const Card = require('./CardModel');

const getAllCards = () => Card.find({});

const getCardsByCardType = (cardType) => Card.find({ cardType });

const getCardsByTeam = (team) => Card.find({ teams: team });

module.exports = {
  getAllCards, getCardsByCardType, getCardsByTeam,
};
