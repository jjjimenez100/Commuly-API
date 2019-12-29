const faker = require('faker');
const logger = require('../config/winston');
const { connectToMongoDB, closeMongoDBConnection } = require('../config/database');
const User = require('../api/user/UserModel');

const seedCount = process.argv[2] || 0;

const seedUsers = () => {
  logger.info('Seeding fake user data...');
  const users = [];
  for (let index = 0; index < seedCount; index += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const phoneNumber = faker.phone.phoneNumber();
    const avatarUrl = faker.internet.url();
    const email = faker.internet.email();
    const password = faker.lorem.word();
    const role = faker.lorem.word();

    const user = {
      firstName,
      lastName,
      phoneNumber,
      avatarUrl,
      email,
      password,
      role,
    };
    logger.info(`User data: ${JSON.stringify(user)}`);
    users.push(user);
  }

  return User.insertMany(users);
};

connectToMongoDB().then(async () => {
  try {
    await seedUsers();
    logger.info('Done seeding fake data');
    await closeMongoDBConnection();
  } catch (error) {
    logger.error('Failed to seed users', error);
  }
}).catch(() => logger.error('Failed to connect to mongo database'));
