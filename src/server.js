const express = require('express');
const bodyParser = require('body-parser');
const morganBody = require('morgan-body');
const logger = require('./config/winston');
const routes = require('./routes');
const { BASE_URL, PORT } = require('./constants/api');
const { connectToMongoDB } = require('./config/database');
const serverErrorHandler = require('./util/serverErrorHandler');

// TODO: Do some cleaning in here
const app = express();

// TODO: Separate these modules into loaders
app.use(bodyParser.json());

const morganBodyOptions = {
  stream: { write: (message) => logger.error(message.trim()) },
  // Skip 422 and 404 responses since we wouldn't want to flood our logs with not found and unprocessable requests
  skip: (request, response) => response.statusCode < 400 || response.statusCode === 422 || response.statusCode === 404,
};
morganBody(app, morganBodyOptions);

app.use(BASE_URL, routes);
connectToMongoDB().then(async () => {
  app.listen(PORT, () => logger.info(`Listening to port ${PORT}`));
});

app.use(serverErrorHandler);
