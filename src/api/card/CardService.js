const CardRepository = require('./CardRepository');

const getAllCards = () => CardRepository.getAllCards();

module.exports = {
  getAllCards,
};
