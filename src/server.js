const express = require('express');
const logger = require('./config/winston');
const routes = require('./routes');
const { BASE_URL, PORT } = require('./constants/api');
const connectToMongoDB = require('./config/database');

const app = express();

app.use(BASE_URL, routes);
connectToMongoDB().then(async () => {
  app.listen(PORT, () => logger.info(`Listening to port ${PORT}`));
});
