const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const config = require('./config/configFile');
const sequelize = require('./config/databaseConnect');



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));


app.listen(config.port);

logger.info(`Сервер успешно запущен на порте: ${config.port}`);
