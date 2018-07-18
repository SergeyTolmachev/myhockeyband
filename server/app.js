const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port);

logger.info(`Сервер успешно запущен на порте: ${port}`);
