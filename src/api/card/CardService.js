const uuid = require('uuid/v4');
const CardRepository = require('./CardRepository');
const {
  IMAGE_CONTENT,
  VIDEO_CONTENT,
  SCHEDULED_CONTENT,
} = require('./CardEnum');
const CloudStorage = require('../../modules/interfaces/cloudStorage');

const getAllCards = () => CardRepository.getAllCards();

const getCardsByCardType = (cardType) => CardRepository.getCardsByCardType(cardType);

const getCardsByTeam = (team) => CardRepository.getCardsByTeam(team);

const getCardsByIds = (ids) => CardRepository.getCardsByIds(ids);

const saveImageContentCard = async (imageCard) => {
  // FIX ME, have distinct directories for each type, for each user/team if possible
  const { file: image } = imageCard;
  const imageURLContent = uuid();
  await CloudStorage.uploadFile(imageURLContent, image);
  await CardRepository.saveCard({
    ...imageCard, imageURLContent,
  });
};

const saveVideoContentCard = async (videoCard) => {
  // FIX ME, have distinct directories for each type, for each user/team if possible
  const { file: video } = videoCard;
  const videoURLContent = uuid();
  await CloudStorage.uploadFile(videoURLContent, video);
  await CardRepository.saveCard({
    ...videoURLContent, videoURLContent,
  });
};

const saveScheduledEventCard = async (scheduledCard) => {
  // FIX ME, have distinct directories for each type, for each user/team if possible
  const { file: image } = scheduledCard;
  const imagePosterURL = uuid();
  await CloudStorage.uploadFile(imagePosterURL, image);
  // FIX
};

const saveContentCard = (card) => {
  // text, chart, serial table, todo
  const { contentCardType } = card;
  if (contentCardType === IMAGE_CONTENT) {
    return saveImageContentCard(card);
  }

  if (contentCardType === VIDEO_CONTENT) {
    return saveVideoContentCard(card);
  }

  if (contentCardType === SCHEDULED_CONTENT) {
    return saveScheduledEventCard(card);
  }

  return CardRepository.saveCard(card);
};

const saveQuestionCard = (card) => CardRepository.saveCard(card);

const reactToCard = (cardId, reactionType, userId) => {
  CardRepository.addReaction(cardId, reactionType, userId);
};

const unreactToCard = (cardId, reactionType, userId) => {
  CardRepository.removeReaction(cardId, reactionType, userId);
};

module.exports = {
  getAllCards,
  getCardsByCardType,
  getCardsByTeam,
  getCardsByIds,
  reactToCard,
  unreactToCard,
  saveContentCard,
  saveQuestionCard,
};
