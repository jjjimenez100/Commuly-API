const CardRepository = require('./CardRepository');
const {
  IMAGE_CONTENT,
  VIDEO_CONTENT,
  SCHEDULED_CONTENT,
} = require('./CardEnum');

const getAllCards = () => CardRepository.getAllCards();

const getCardsByCardType = (cardType) => CardRepository.getCardsByCardType(cardType);

const getCardsByTeam = (team) => CardRepository.getCardsByTeam(team);

const saveImageContentCard = (imageCard) => {

};

const saveVideoContentCard = (videoCard) => {

};

const saveScheduledEventCard = (scheduledCard) => {

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

module.exports = {
  getAllCards, getCardsByCardType, getCardsByTeam,
};
