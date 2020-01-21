const CardService = require('./CardService');

const getCards = async (request, response, next) => {
  try {
    /**
     * These are the only filters we need atm.
     * Convert properties into object keys if more
     * filters are needed to be supported.
     */
    const { cardType = '', team = '', ids = [] } = request.query;
    let cards;
    if (cardType !== '') {
      cards = await CardService.getCardsByCardType(cardType);
    } else if (team !== '') {
      cards = await CardService.getCardsByTeam(team);
    } else if (ids) {
      cards = await CardService.getCardsByIds(ids);
    } else {
      cards = await CardService.getAllCards();
    }
    response.send(cards);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCards,
};
