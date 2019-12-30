const Card = require('./CardModel');

const getAllCards = () => Card.find({});

module.exports = {
  getAllCards,
};
