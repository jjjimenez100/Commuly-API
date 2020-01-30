const faker = require('faker');
const { ObjectId } = require('mongoose').Types;
const model = require('../api/user/UserModel');
const { TODO_STATUS } = require('../api/user/UserEnum');

const populateDumbArray = (dataFunction) => {
  const array = [];
  const length = faker.random.number(10);
  for (let index = 0; index < length; index += 1) {
    array.push(dataFunction());
  }

  return array;
};

const seedCount = process.argv[2] || 10;
const dataGeneratorFunction = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const phoneNumber = faker.phone.phoneNumber();
  const avatarUrl = faker.internet.url();
  const email = faker.internet.email();
  const role = faker.lorem.word();

  const pinnedCards = populateDumbArray(ObjectId);
  const scheduledCards = populateDumbArray(ObjectId);
  const reactedCards = populateDumbArray(ObjectId);
  const teams = populateDumbArray(ObjectId);
  const activeTeam = teams[faker.random.number(teams.length - 1)];
  const todoGenerator = () => ({
    todoId: ObjectId(),
    status: TODO_STATUS[faker.random.number(TODO_STATUS.length - 1)],
  });
  const todoCards = populateDumbArray(todoGenerator);

  return {
    firstName,
    lastName,
    phoneNumber,
    avatarUrl,
    email,
    role,
    activeTeam,
    pinnedCards,
    scheduledCards,
    reactedCards,
    teams,
    todoCards,
  };
};

const startSeeder = require('./seeder');

startSeeder(seedCount, model, dataGeneratorFunction);
