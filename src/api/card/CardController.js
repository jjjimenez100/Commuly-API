const CardService = require('./CardService');

const getAllCards = async (request, response, next) => {
  try {
    const cards = await CardService.getAllCards();
    response.send(cards);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCards,
};
