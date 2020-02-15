const faker = require('faker');
const { ObjectId } = require('mongoose').Types;
const logger = require('../modules/logger');
const {
  SCHEDULED_CONTENT,
  TODO_CONTENT,
  TEXT_CONTENT,
} = require('../api/card/CardEnum');
const teamModel = require('../api/team/TeamModel');
const teamService = require('../api/team/TeamService');
const userService = require('../api/user/UserService');
const cardModel = require('../api/card/CardModel');

const { connectToMongoDB, closeMongoDBConnection } = require('../modules/database');

const { dataGeneratorFunction: teamCardGenerator } = require('./teamCardGenerator');

const DEFAULT_TEAM_ID = '5e35bfdec83b1711f6965192';
const DEFAULT_USER_ID = '5e35bfdec83b1711f6965588';
// check if team exists, create it if it doesnt exist

const teamCardSize = 10;
const randomUsersSize = 10;

let userIds = [];
let teamCards = [];
let teamCardIds = [];

const updatePromises = [];

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

const generateIds = () => {
  for (let index = 0; index < teamCardSize; index += 1) {
    teamCardIds.push(ObjectId());
  }
  for (let index = 0; index < randomUsersSize; index += 1) {
    userIds.push(ObjectId());
  }
};

const teamCardSeeder = (teamId = '') => {
  for (let index = 0; index < teamCardSize; index += 1) {
    const entity = teamCardGenerator(10, userIds, teamId, teamCardIds[index]);
    teamCards.push(entity);
  }

  return cardModel.insertMany(teamCards);
};

const teamCardsSeeder = async (teamId) => {
  try {
    await teamCardSeeder(teamId);
  } catch (error) {
    logger.error(`Failed to seed data, ${error}`);
  }
};

const seedDashboard = async (userId) => {
  logger.info('Starting to seed dashboard entities...');
  generateIds();
  logger.info('Done generating fake ids');
  try {
    const shouldSeedCardTeam = await createDefaultTeamIfItDoesntExist();
    logger.info('Done checking if default team doesnt exist');
    await teamCardsSeeder(DEFAULT_TEAM_ID);
    if (shouldSeedCardTeam) {
      logger.info(`Done seeding cards with default team id of ${DEFAULT_TEAM_ID}`);
      // Update team
      teamCards.forEach((teamCard) => {
        const { _id: cardId, team, contentCardType } = teamCard;
        if (contentCardType === TEXT_CONTENT) {
          updatePromises.push(teamService.pinCardToTeamStream(team, cardId));
        } else if (contentCardType === SCHEDULED_CONTENT) {
          updatePromises.push(teamService.addScheduleToTeam(team, cardId));
        } else if (contentCardType === TODO_CONTENT) {
          updatePromises.push(teamService.addTodoToTeam(team, cardId));
        }
      });

      await Promise.all(updatePromises);
      logger.info(`Done updating default team of ${DEFAULT_TEAM_ID}`);
    }

    // generate cards that are specific only to the user
    teamCards = [];
    // generate new set of ids
    teamCardIds = [];
    userIds = [];
    generateIds();

    await teamCardsSeeder();
    logger.info('Done seeding cards specific to user');

    // Update user
    const id = userId || DEFAULT_USER_ID;
    teamCards.forEach((teamCard) => {
      const { _id: cardId, contentCardType } = teamCard;
      if (contentCardType === SCHEDULED_CONTENT) {
        updatePromises.push(userService.addScheduleToUser(id, cardId));
      } else if (contentCardType === TODO_CONTENT) {
        updatePromises.push(userService.addTodoToUser(id, cardId));
      }
    });
    await Promise.all(updatePromises);
    logger.info(`Done updating default user of ${id}`);
    logger.info(`Done seeding dashboard entities for user ${id}`);

    teamCards = [];
    teamCardIds = [];
    userIds = [];
  } catch (error) {
    logger.error(`Failed to seed dashboard entities ${error}`);
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
