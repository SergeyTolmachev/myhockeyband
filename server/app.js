const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const config = require('./config/configFile');
const registration = require('./routes/registration');
const authenticate = require('./routes/authenticate');
const logRequest = require('./middlewares/logRequest');
const error404 = require('./middlewares/error404');
const NHLTeams = require('./routes/NHLTeams');
const game = require('./routes/game');



const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/static', express.static('public'));

// логгируем все входящие запросы

app.use(logRequest);


// пути не требующие авторизации

app.use('/registration', registration); // регистрация

app.use('/authenticate', authenticate); // аутентификация пользователя и выдача токена

app.use('/NHLTeams', NHLTeams);// получение статистики команд NHL


// пути требующие авторизации

app.use('/game', game);

app.use(error404);


app.listen(config.port);

logger.info(`Сервер успешно запущен на порте: ${config.port}`);
