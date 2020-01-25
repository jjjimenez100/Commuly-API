const path = require('path');
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

const getRandomizedFilename = (team, folder, originalFileName) => {
  const randomFileName = uuid();
  const fileExtension = path.extname(originalFileName);

  return `${team}/${folder}/${randomFileName}${fileExtension}`;
};

const saveImageContentCard = async (imageCard) => {
  const { file: { buffer, originalname }, team } = imageCard;

  const imageURLContent = getRandomizedFilename(team, IMAGE_CONTENT, originalname);
  await CloudStorage.uploadFile(imageURLContent, buffer);

  const { _id } = await CardRepository.saveCard({
    ...imageCard, imageURLContent,
  });

  return _id;
};

const saveVideoContentCard = async (videoCard) => {
  const { file: { buffer, originalname }, team } = videoCard;

  const videoURLContent = getRandomizedFilename(team, VIDEO_CONTENT, originalname);
  await CloudStorage.uploadFile(videoURLContent, buffer);

  const { _id } = await CardRepository.saveCard({
    ...videoCard, videoURLContent,
  });

  return _id;
};

const saveScheduledEventCard = async (scheduledCard) => {
  const { file: { buffer, originalname }, team } = scheduledCard;

  const imagePosterURL = getRandomizedFilename(team, SCHEDULED_CONTENT, originalname);
  await CloudStorage.uploadFile(imagePosterURL, buffer);

  const updatedScheduledCard = { ...scheduledCard };
  updatedScheduledCard.scheduledEventContent.imagePosterURL = imagePosterURL;

  const { _id } = await CardRepository.saveCard(updatedScheduledCard);

  return _id;
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
