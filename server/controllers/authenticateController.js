const jwt = require('jsonwebtoken');
const User = require('../schemas/user');
const logger = require('../utils/logger');
const hash = require('../utils/hash');
const config = require('../config/configFile');


module.exports.authenticate = async (req, res) => {
  try {
    const userToCheck = await User.findAndCount({
      where: {
        login: req.body.login,
      },
    });
    if (userToCheck.count > 0) {
      if (await hash.getHash(req.body.password, userToCheck.rows[0].dataValues.password)) {
        const token = jwt.sign({
          login: req.body.login,
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
};
