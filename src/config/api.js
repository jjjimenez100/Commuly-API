const API_VERSION = process.env.API_VERSION || 'v1';
const ROOT_URL = process.env.ROOT_URL || '/commuly/api';
const PORT = process.env.PORT || 3000;
const BASE_URL = `${ROOT_URL}/${API_VERSION}`;

module.exports = { BASE_URL, PORT, API_VERSION };
