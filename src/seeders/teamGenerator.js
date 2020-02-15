const faker = require('faker');
const { ObjectId } = require('mongoose').Types;

// no threshold generator yet
const dataGeneratorFunction = (userIds, cardIds, teamId) => {
  const name = faker.name.jobDescriptor();

  const membersSize = faker.random.number(userIds.length - 1);
  const members = [];
  for (let index = 0; index < membersSize; index += 1) {
    // TODO: Prevent duplicates
    members.push(userIds[faker.random.number(userIds.length - 1)]);
  }

  const admins = [userIds[faker.random.number(userIds.length - 1)]];

  const pinnedCardsSize = faker.random.number(cardIds.length - 1);
  const pinnedCards = [];
  for (let index = 0; index < pinnedCardsSize; index += 1) {
    pinnedCards.push(cardIds[faker.random.number(cardIds.length - 1)]);
  }

  const scheduledCardsSize = faker.random.number(cardIds.length - 1);
  const scheduledCards = [];
  for (let index = 0; index < scheduledCardsSize; index += 1) {
    scheduledCards.push(cardIds[faker.random.number(cardIds.length - 1)]);
  }

  const todoCardsSize = faker.random.number(cardIds.length - 1);
  const todoCards = [];
  for (let index = 0; index < todoCardsSize; index += 1) {
    todoCards.push(cardIds[faker.random.number(cardIds.length - 1)]);
  }

  return {
    _id: ObjectId(teamId),
    name,
    members,
    admins,
    pinnedCards,
    scheduledCards,
    todoCards,
  };
};

module.exports = { dataGeneratorFunction };
