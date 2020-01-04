const express = require('express');
const bodyParser = require('body-parser');
const morganBody = require('morgan-body');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

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
  // We wouldn't want to flood our logs with not found and unprocessable requests
  skip: (request, response) => response.statusCode < 400
   || response.statusCode === 422
    || response.statusCode === 404,
};
morganBody(app, morganBodyOptions);

const windowMs = 15 * 60 * 1000;
const max = 100;
const rateLimiter = rateLimit({
  windowMs,
  max,
  handler(request, response) {
    const { ip } = request;
    const errorMessage = `${ip} exceeded ${max} requests within ${windowMs}`;
    response.status(429).send(errorMessage);
  },
});
app.use(rateLimiter);

app.use(helmet());
app.use(cors());
// TODO: Add csurf and rate limit succeeding requests per ms

app.use(BASE_URL, routes);
connectToMongoDB().then(async () => {
  app.listen(PORT, () => logger.info(`Listening to port ${PORT}`));
});

app.use(serverErrorHandler);
