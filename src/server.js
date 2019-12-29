const express = require('express');
const logger = require('./config/winston');

const app = express();
const port = 3000;

app.get('/', (request, response) => response.send('Hello there!'));

app.listen(port, () => logger.info('Listening to port...'));
