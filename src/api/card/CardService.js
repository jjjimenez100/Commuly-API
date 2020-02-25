const path = require('path');
const uuid = require('uuid/v4');
const moment = require('moment-timezone');

const CardRepository = require('./CardRepository');
const UserService = require('../user/UserService');
const TeamService = require('../team/TeamService');

const {
  IMAGE_CONTENT,
  VIDEO_CONTENT,
  SCHEDULED_CONTENT,
  TODO_CONTENT,

  INDIVIDUAL_TYPE,
  TEAM_TYPE,
} = require('./CardEnum');
const CloudStorage = require('../../modules/interfaces/cloudStorage');

const getAllCards = () => CardRepository.getAllCards();

const sortMostRecentCards = (cards) => {
  cards.sort(({ createdDate: a }, { createdDate: b }) => moment.tz(b, 'Asia/Manila') - moment.tz(a, 'Asia/Manila'));
};

const getCardsByCardType = async (cardType) => {
  const cards = await CardRepository.getCardsByCardType(cardType);
  sortMostRecentCards(cards);

  return cards;
};

const getCardsByTeam = async (team, page, limit) => {
  const cards = await CardRepository.getCardsByTeam(team, page, limit);
  sortMostRecentCards(cards);

  return cards;
};

const getCardsByIds = async (ids) => {
  const cards = await CardRepository.getCardsByIds(ids);
  sortMostRecentCards(cards);

  return cards;
};

const getCardById = (id) => CardRepository.getCardById(id);

const getRandomizedFilename = (team, folder, originalFileName) => {
  const randomFileName = uuid();
  const fileExtension = path.extname(originalFileName);

  return `${team}/${folder}/${randomFileName}${fileExtension}`;
};

const saveImageContentCard = async (imageCard) => {
  const { file: { buffer, originalname }, team = '' } = imageCard;

  const imageURLContent = getRandomizedFilename(team, IMAGE_CONTENT, originalname);
  await CloudStorage.uploadFile(imageURLContent, buffer);

  return CardRepository.saveCard({
    ...imageCard, imageURLContent,
  });
};

const saveVideoContentCard = async (videoCard) => {
  const { file: { buffer, originalname }, team = '' } = videoCard;

  const videoURLContent = getRandomizedFilename(team, VIDEO_CONTENT, originalname);
  await CloudStorage.uploadFile(videoURLContent, buffer);

  return CardRepository.saveCard({
    ...videoCard, videoURLContent,
  });
};

const saveScheduledEventCard = async (scheduledCard) => {
  const { file: { buffer, originalname }, team = '' } = scheduledCard;

  const imagePosterURL = getRandomizedFilename(team, SCHEDULED_CONTENT, originalname);
  await CloudStorage.uploadFile(imagePosterURL, buffer);

  const updatedScheduledCard = { ...scheduledCard };
  updatedScheduledCard.scheduledEventContent = JSON.parse(
    updatedScheduledCard.scheduledEventContent,
  );
  updatedScheduledCard.scheduledEventContent.imagePosterURL = imagePosterURL;
  const card = await CardRepository.saveCard(updatedScheduledCard);

  const { scheduledEventContent: { scheduleType } } = scheduledCard;
  const { _id } = card;
  if (scheduleType === INDIVIDUAL_TYPE) {
    const { userIds } = scheduledCard;
    await UserService.addScheduleToUsers(userIds, _id);
  } else if (team !== '' && scheduleType === TEAM_TYPE) {
    await TeamService.addScheduleToTeam(team, _id);
  }

  return card;
};

const saveTodoContentCard = async (todoCard, team = '', userId = 0) => {
  const card = await CardRepository.saveCard(todoCard);
  const { _id } = card;
  const { todoType } = todoCard;

  if (todoType === INDIVIDUAL_TYPE) {
    const { userIds } = todoCard;
    await UserService.addTodoToUsers(userIds, _id);
  } else if (team !== '' && todoType === TEAM_TYPE) {
    await TeamService.addTodoToTeam(team, _id);
    await UserService.addTodoToUser(userId, _id);
  }

  return card;
};

const saveContentCard = (card, team = '', userId = 0) => {
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

  if (contentCardType === TODO_CONTENT) {
    return saveTodoContentCard(card, team, userId);
  }

  return CardRepository.saveCard(card);
};

const saveQuestionCard = (card) => CardRepository.saveCard(card);

const reactToCard = async (cardId, reactionType, userId) => {
  await CardRepository.addReaction(cardId, reactionType, userId);
  await UserService.addCardReactionToUser(userId, cardId);
};

const unreactToCard = async (cardId, reactionType, userId) => {
  await CardRepository.removeReaction(cardId, reactionType, userId);
  await UserService.removeCardReactionToUser(userId, cardId);
};

const addResponseToCard = (cardId, response, questionCardType) => CardRepository.addResponse(
  cardId, response, questionCardType,
);

const removeResponseToCard = (cardId, userId, questionCardType) => CardRepository.removeResponse(
  cardId, userId, questionCardType,
);

const updateCard = (cardId, card) => CardRepository.updateAndOverwriteCard(cardId, card);

exports.getAllCards = getAllCards;
exports.getCardsByCardType = getCardsByCardType;
exports.getCardsByTeam = getCardsByTeam;
exports.getCardsByIds = getCardsByIds;
exports.reactToCard = reactToCard;
exports.unreactToCard = unreactToCard;
exports.saveContentCard = saveContentCard;
exports.saveQuestionCard = saveQuestionCard;
exports.addResponseToCard = addResponseToCard;
exports.removeResponseToCard = removeResponseToCard;
exports.updateCard = updateCard;
exports.getCardById = getCardById;
