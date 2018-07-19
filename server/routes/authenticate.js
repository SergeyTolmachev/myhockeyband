const express = require('express');

const router = express.Router();
const User = require('../models/user');
const logger = require('../utils/logger');
const getHash = require('../utils/getHash');
const jwt = require('jsonwebtoken');
const config = require('../config/configFile');



router.post('/', async (req, res) => {
  try {
    const userToCheck = await User.findAndCount({
      where: {
        login: req.body.login,
      },
    });
    if (userToCheck.count > 0) {
      if (await getHash(req.body.password, userToCheck.rows[0].dataValues.password)) {
        const token = jwt.sign({
          login: req.query.login,
        },
        config.secretForToken, {
          expiresIn: '1h',
        });
        const dataToSend = {
          success: true,
          message: 'аутентификация прошла успешно',
          token,
        };
        res.status(200).json(dataToSend);
        logger.info('аутентификация прошла успешно');
      } else {
        res.status(400).send('введен неверный пароль');
        logger.info('введен неверный пароль');
      }
    } else {
      res.status(400).send(`отсутствует пользователь с данным логином ${req.body.login}`);
      logger.info(`отсутствует пользователь с данным логином ${req.body.login}`);
    }
  } catch (error) {
    res.status(404).send('Ошибка при проверке данных для аутентификации при обращении к базе данных');
    logger.error('Ошибка при проверке данных для аутентификации при обращении к базе данных', error);
  }
});


module.exports = router;
