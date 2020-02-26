const CardService = require('./CardService');
const UserService = require('../user/UserService');

const CloudStorage = require('../../modules/interfaces/cloudStorage');

const {
  CONTENT_CARD,
  QUESTION_CARD,

  REACT,
  UNREACT,

  ADD_RESPONSE,
  REMOVE_RESPONSE,

  QUESTION_CONTENT_RESPONSE_MAPPING,

  CONTENT_CARD_TYPES_WITH_CLOUD_FILES,
  IMAGE_CONTENT,
  VIDEO_CONTENT,
  SCHEDULED_CONTENT,
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
    const { cardType, team = '', owner = 0 } = body;
    let savedCard;
    if (cardType === CONTENT_CARD) {
      savedCard = await CardService.saveContentCard({ ...body, file }, team, owner);
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

const putCard = async (request, response, next) => {
  try {
    const { id: cardId } = request.params;
    const { body: card, file } = request;
    const { cardType } = card;
    const [cardDetails] = await CardService.getCardById(cardId);
    const { createdDate } = cardDetails;
    if (cardType === CONTENT_CARD) {
      const { contentCardType, shouldDeleteCloudFile = false } = card;
      const scheduledEventContent = contentCardType === SCHEDULED_CONTENT
        ? JSON.parse(card.scheduledEventContent)
        : {};
      if (CONTENT_CARD_TYPES_WITH_CLOUD_FILES.includes(contentCardType)) {
        // form data stringifies boolean
        if (String(shouldDeleteCloudFile) === 'true') {
          let cloudFileName = '';
          if (contentCardType === IMAGE_CONTENT) {
            cloudFileName = cardDetails.imageURLContent || '';
          } else if (contentCardType === VIDEO_CONTENT) {
            cloudFileName = cardDetails.videoURLContent || '';
          } else if (contentCardType === SCHEDULED_CONTENT) {
            cloudFileName = cardDetails.scheduledEventContent.imagePosterURL || '';
          }
          await CloudStorage.deleteFile(cloudFileName);

          const updatedFileURL = await CardService.updateFile({ ...card, file });
          if (contentCardType === IMAGE_CONTENT) {
            card.imageURLContent = updatedFileURL;
          } else if (contentCardType === VIDEO_CONTENT) {
            card.videoURLContent = updatedFileURL;
          } else if (contentCardType === SCHEDULED_CONTENT) {
            scheduledEventContent.imagePosterURL = updatedFileURL;
          }

          let updatedCard;
          if (contentCardType === SCHEDULED_CONTENT) {
            updatedCard = await CardService.updateCard(cardId, {
              ...card,
              scheduledEventContent,
              createdDate,
            });
          } else {
            updatedCard = await CardService.updateCard(cardId, { ...card, createdDate });
          }
          response.send({ updatedCard });
          return;
        }
        const partialUpdatedCard = { ...card, createdDate };
        if (contentCardType === IMAGE_CONTENT) {
          partialUpdatedCard.imageURLContent = cardDetails.imageURLContent;
        } else if (contentCardType === VIDEO_CONTENT) {
          partialUpdatedCard.videoURLContent = cardDetails.videoURLContent;
        } else if (contentCardType === SCHEDULED_CONTENT) {
          scheduledEventContent
            .imagePosterURL = cardDetails.scheduledEventContent.imagePosterURL;
        }

        let updatedCard;
        if (contentCardType === SCHEDULED_CONTENT) {
          updatedCard = await CardService.updateCard(cardId, {
            ...partialUpdatedCard,
            scheduledEventContent,
          });
        } else {
          updatedCard = await CardService.updateCard(cardId, partialUpdatedCard);
        }
        response.send({ updatedCard });
      } else {
        const updatedCard = await CardService.updateCard(cardId, { ...card, createdDate });
        response.send({ updatedCard });
      }
    } else if (cardType === QUESTION_CARD) {
      // remove responses on the actual card
      const { questionCardType = '' } = cardDetails;
      const questionCardContent = QUESTION_CONTENT_RESPONSE_MAPPING[questionCardType];
      await CardService.removeResponsesToCard(
        cardId, questionCardContent,
      );

      // remove responses to each user
      const { responses } = cardDetails[questionCardContent];
      const respondedUserIds = responses.map(({ userId }) => userId);
      await UserService.removeCardResponseToUsers(respondedUserIds, cardId);

      const updatedCard = await CardService.updateCard(cardId, { ...card, createdDate });
      response.status(200).send({ updatedCard });
    } else {
      response.status(400).send({ message: 'Invalid card type. ' });
    }
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
      const { userId: responseUserId } = userResponse;
      const { name, email } = await UserService.getUserById(responseUserId);
      const newUserResponse = { ...userResponse, name, email };
      await CardService.addResponseToCard(
        cardId,
        newUserResponse,
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
  getCards, postCard, patchCard, putCard,
};
