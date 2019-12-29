const express = require('express');
const bodyParser = require('body-parser');
const morganBody = require('morgan-body');
const logger = require('./config/winston');
const routes = require('./routes');
const { BASE_URL, PORT } = require('./constants/api');
const { connectToMongoDB } = require('./config/database');
const serverErrorHandler = require('./util/serverErrorHandler');


const app = express();

// TODO: Separate these modules into loaders
app.use(bodyParser.json());

const morganBodyOptions = {
  stream: { write: (message) => logger.error(message.trim()) },
  skip: (request, response) => response.statusCode < 400,
};
morganBody(app, morganBodyOptions);

app.use(BASE_URL, routes);
connectToMongoDB().then(async () => {
  app.listen(PORT, () => logger.info(`Listening to port ${PORT}`));
});

app.use(serverErrorHandler);
