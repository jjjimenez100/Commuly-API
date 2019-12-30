const faker = require('faker');
const model = require('../api/card/CardModel');

const seedCount = 10;
const dataGeneratorFunction = () => {
  const owner = faker.random.uuid();
  const cardType = faker.lorem.word();
  const reactions = {
    understood: [faker.random.uuid(), faker.random.uuid()],
    excited: [faker.random.uuid(), faker.random.uuid()],
    bored: [faker.random.uuid(), faker.random.uuid()],
    confused: [faker.random.uuid(), faker.random.uuid()],
  };

  const textContent = faker.lorem.word();

  return {
    owner, cardType, reactions, textContent,
  };
};

const startSeeder = require('./seeder');

startSeeder(seedCount, model, dataGeneratorFunction);
