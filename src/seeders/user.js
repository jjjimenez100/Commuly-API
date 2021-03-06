const faker = require('faker');
const { ObjectId } = require('mongoose').Types;
const model = require('../api/user/UserModel');

const seedCount = 1;
const dataGeneratorFunction = () => {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const phoneNumber = faker.phone.phoneNumber();
  const avatarUrl = faker.internet.url();
  const email = faker.internet.email();
  const role = faker.lorem.word();
  const activeTeam = ObjectId('5e35bfdec83b1711f6965192');

  return {
    _id: ObjectId('5e35bfdec83b1711f6965588'),
    firstName,
    lastName,
    phoneNumber,
    avatarUrl,
    email,
    role,
    activeTeam,
  };
};

const startSeeder = require('./seeder');

startSeeder(seedCount, model, dataGeneratorFunction);
