const CardService = require('./CardService');
const { CONTENT_CARD, QUESTION_CARD } = require('./CardEnum');

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

const postCard = async (request, response, next) => {
  // FIXME
  try {
    const { body, file } = request;
    const { cardType } = body;
    let id;
    if (cardType === CONTENT_CARD) {
      id = await CardService.saveContentCard({ ...body, file });
    } else if (cardType === QUESTION_CARD) {
      id = await CardService.saveQuestionCard({ ...body });
    } else {
      response.status(422).send({
        message: 'Unexpected card type',
      });
      return;
    }
    response.status(201).send({ id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCards, postCard,
};
