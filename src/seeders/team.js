const faker = require('faker');
const model = require('../api/team/TeamModel');

const seedCount = 10;
const dataGeneratorFunction = () => {
  const name = faker.lorem.word();

  return {
    name,
  };
};

const startSeeder = require('./seeder');

startSeeder(seedCount, model, dataGeneratorFunction);
