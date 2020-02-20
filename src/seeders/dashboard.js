const faker = require('faker');
const { ObjectId } = require('mongoose').Types;
const logger = require('../modules/logger');
const teamModel = require('../api/team/TeamModel');
const { connectToMongoDB, closeMongoDBConnection } = require('../modules/database');

const DEFAULT_TEAM_ID = '5e35bfdec83b1711f6965192';
const createDefaultTeamIfItDoesntExist = async () => {
  try {
    logger.info('Checking if default team doesnt exist');
    const foundTeam = await teamModel.findOne({ _id: DEFAULT_TEAM_ID }).exec();
    logger.info(`Found team is: ${foundTeam}`);
    if (foundTeam === null) {
      // create team
      const defaultTeam = {
        _id: ObjectId(DEFAULT_TEAM_ID),
        name: faker.lorem.word(),
      };
      await teamModel.create(defaultTeam);
      return true;
    }
  } catch (error) {
    logger.error(`Failed to query on team collection ${error}`);
  }
  return false;
};

const seedDashboard = async () => {
  try {
    await createDefaultTeamIfItDoesntExist();
  } catch (error) {
    logger.error(`Failed to initialize creation of defaul team ${error}`);
  }
};

const initSeeding = (hasActiveMongoConnection, userId) => {
  try {
    if (!hasActiveMongoConnection) {
      connectToMongoDB().then(() => {
        seedDashboard().then(() => closeMongoDBConnection());
      }).catch(() => logger.error('Failed to connect to mongo database'));
    } else {
      seedDashboard(userId).then(() => {}).catch('Failed to use current active mongo connection');
    }
  } catch (error) {
    logger.error(`Failed to seed dashboard entities ${error}`);
  }
};

module.exports = { initSeeding };
