const Sequelize = require('sequelize');
const config = require('./configFile');
const logger = require('../utils/logger');

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  dialectOptions: {
    ssl: 'Amazon RDS',
  },
  port: config.databasePort,
  logging: false,
});


sequelize
  .authenticate()
  .then(() => {
    logger.info('Соединение с базой данных успешно установлено');
  })
  .catch((err) => {
    logger.error('Ошибка подключения к базе данных: ', err);
  });

module.exports = sequelize;
