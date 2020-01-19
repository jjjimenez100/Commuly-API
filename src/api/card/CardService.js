const CardRepository = require('./CardRepository');

const getAllCards = () => CardRepository.getAllCards();

const getCardsByCardType = (cardType) => CardRepository.getCardsByCardType(cardType);

const getCardsByTeam = (team) => CardRepository.getCardsByTeam(team);

module.exports = {
  getAllCards, getCardsByCardType, getCardsByTeam,
};
