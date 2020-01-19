const logger = require('../modules/logger');
const { connectToMongoDB, closeMongoDBConnection } = require('../modules/database');

const seeder = (seedCount, model, dataGeneratorFunction) => {
  const entities = [];
  logger.info('Seeding fake data...');

  for (let index = 0; index < seedCount; index += 1) {
    const entity = dataGeneratorFunction();
    logger.info(`Entity data: ${JSON.stringify(entity, null, 2)}`);
    entities.push(entity);
  }

  return model.insertMany(entities);
};

const startSeeder = (seedCount, model, dataGeneratorFunction) => {
  connectToMongoDB().then(async () => {
    try {
      await seeder(seedCount, model, dataGeneratorFunction);
      logger.info(`Done seeding ${seedCount} fake entities`);
    } catch (error) {
      logger.error(`Failed to seed data, ${error}`);
    }
    await closeMongoDBConnection();
  }).catch(() => logger.error('Failed to connect to mongo database'));
};

module.exports = startSeeder;
