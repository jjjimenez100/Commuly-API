const CardService = require('./CardService');
const UserService = require('../user/UserService');

const {
  CONTENT_CARD,
  QUESTION_CARD,

  REACT,
  UNREACT,

  ADD_RESPONSE,
  REMOVE_RESPONSE,

  QUESTION_CONTENT_RESPONSE_MAPPING,
} = require('./CardEnum');

const getCards = async (request, response, next) => {
  try {
    const { cardType = '', team = '' } = request.query;
    let cards;

    if (cardType !== '') {
      cards = await CardService.getCardsByCardType(cardType);
    } else if (team !== '') {
      const { page = 0, limit = 5 } = request.query;
      // eslint-disable-next-line radix
      cards = await CardService.getCardsByTeam(team, parseInt(page), parseInt(limit));
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
    let savedCard;
    if (cardType === CONTENT_CARD) {
      savedCard = await CardService.saveContentCard({ ...body, file }, team);
    } else if (cardType === QUESTION_CARD) {
      savedCard = await CardService.saveQuestionCard({ ...body });
    } else {
      response.status(422).send({
        message: 'Unexpected card type',
      });
      return;
    }
    response.status(201).send({ savedCard });
  } catch (error) {
    next(error);
  }
};

const patchCard = async (request, response, next) => {
  try {
    const {
      patchType = '',
      reactionType = '',
      userId = '',
      response: userResponse = '',
      questionCardType = '',
    } = request.body;
    const { id: cardId } = request.params;
    if (patchType === REACT) {
      await CardService.reactToCard(cardId, reactionType, userId);
    } else if (patchType === UNREACT) {
      await CardService.unreactToCard(cardId, reactionType, userId);
    } else if (patchType === ADD_RESPONSE) {
      await CardService.addResponseToCard(
        cardId,
        userResponse,
        QUESTION_CONTENT_RESPONSE_MAPPING[questionCardType],
      );
      await UserService.addCardResponseToUser(userId, cardId);
    } else if (patchType === REMOVE_RESPONSE) {
      await CardService.removeResponseToCard(
        cardId,
        userId,
        QUESTION_CONTENT_RESPONSE_MAPPING[questionCardType],
      );
      await UserService.removeCardResponseToUser(userId, cardId);
    }
    response.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCards, postCard, patchCard,
};
