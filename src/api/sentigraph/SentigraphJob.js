const { CronJob } = require('cron');
const SentigraphService = require('./SentigraphService');
const logger = require('../../modules/logger');

const create = () => new CronJob({
  cronTime: '00 00 00 28, 29, 30',
  onTick() {
    logger.info('Sentigraph Job - purging old reactions history');
    SentigraphService.deleteOldReactionHistory();
  },
});

const start = (sentigraphJob) => sentigraphJob.start();

const stop = (sentigraphJob) => sentigraphJob.stop();

module.exports = {
  create, start, stop,
};
