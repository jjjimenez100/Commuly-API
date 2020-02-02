const CardService = require('./CardService');

const {
  CONTENT_CARD,
  QUESTION_CARD,

  REACT,
  UNREACT,
} = require('./CardEnum');

const getCards = async (request, response, next) => {
  try {
    const { cardType = '', team = '' } = request.query;
    let cards;

    if (cardType !== '') {
      cards = await CardService.getCardsByCardType(cardType);
    } else if (team !== '') {
      cards = await CardService.getCardsByTeam(team);
    } else {
      cards = await CardService.getAllCards();
    }
    response.send(cards);
  } catch (error) {
    next(error);
  }
};

const postCard = async (request, response, next) => {
  try {
    const { body, file } = request;
    const { cardType, team } = body;
    let id;
    if (cardType === CONTENT_CARD) {
      id = await CardService.saveContentCard({ ...body, file }, team);
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

const patchCard = async (request, response, next) => {
  try {
    const { patchType } = request.body;
    if (patchType === REACT) {
      const { reactionType, userId } = request.body;
      const { id: cardId } = request.params;
      await CardService.reactToCard(cardId, reactionType, userId);
    } else if (patchType === UNREACT) {
      const { reactionType, userId } = request.body;
      const { id: cardId } = request.params;
      await CardService.unreactToCard(cardId, reactionType, userId);
    }
    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCards, postCard, patchCard,
};
