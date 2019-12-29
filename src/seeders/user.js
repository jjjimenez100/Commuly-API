const faker = require('faker');
const model = require('../api/user/UserModel');

const seedCount = process.argv[2] || 0;
const dataGeneratorFunction = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const phoneNumber = faker.phone.phoneNumber();
  const avatarUrl = faker.internet.url();
  const email = faker.internet.email();
  const role = faker.lorem.word();

  return {
    firstName,
    lastName,
    phoneNumber,
    avatarUrl,
    email,
    role,
  };
};

const startSeeder = require('./seeder');

startSeeder(seedCount, model, dataGeneratorFunction);
