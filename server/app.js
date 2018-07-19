const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const config = require('./config/configFile');
const registration = require('./routes/registration');
const authenticate = require('./routes/authenticate');
const checkAuth = require('./middlewares/checkAuth');
const logRequest = require('./middlewares/logRequest');
const error404 = require('./middlewares/error404');
const secret = require('./routes/secret');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// логгируем все входящие запросы

app.use(logRequest);


// пути не требующие авторизации

app.use('/registration', registration);

app.use('/authenticate', authenticate);


// middleware для проверки авторизации

//app.use(checkAuth);

// пути требующие авторизации

app.use('/secret',secret);

app.use(error404);


app.listen(config.port);

logger.info(`Сервер успешно запущен на порте: ${config.port}`);
