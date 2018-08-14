const express = require('express');
const bodyParser = require('body-parser');
const logger = require('./utils/logger');
const config = require('./config/configFile');
const registration = require('./routes/registration');
const authenticate = require('./routes/authenticate');
const logRequest = require('./middlewares/logRequest');
const NHLTeams = require('./routes/NHLTeams');
const game = require('./routes/game');
const player = require('./routes/player');


const app = express();



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', express.static('public'));

// логгируем все входящие запросы

app.use(logRequest);


app.use('/registration', registration); // регистрация

app.use('/authenticate', authenticate); // аутентификация пользователя и выдача токена

app.use('/NHLTeams', NHLTeams);// получение статистики команд NHL

app.use('/player', player);// информация об игроках

app.use('/game', game);// информация об играх

app.use((req, res) => {
  const dataToSend = {
    message: 'Page not found',
    url: `${req.host}${req.url}`,
  };
  res.status(404).json(dataToSend);
});


app.listen(config.port);

logger.info(`Сервер успешно запущен на порте: ${config.port}`);
