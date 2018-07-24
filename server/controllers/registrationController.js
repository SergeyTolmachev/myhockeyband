const User = require('../schemas/user');
const hash = require('../utils/hash');
const logger = require('../utils/logger');

module.exports.registration = async (req, res) => {
  if (req.body.login && req.body.password && req.body.email) {
    const userToReg = {
      login: req.body.login,
      password: await hash.setHash(req.body.password),
      email: req.body.email,
      name: req.body.name || null,
      surname: req.body.surname || null,
      nickname: req.body.nickname || null,
      birthday: req.body.birthday || null,
    };
    let loginFound = false;

    try {
      const result = await User.findAndCount({
        where: {
          login: userToReg.login,
        },
      });
      if (result.count > 0) {
        logger.info(`количество совпадений логина ${result.count}`);
        loginFound = true;
      }
    } catch (error) {
      logger.error('Ошибка проверки имени пользователя', error);
    }

    let emailFound = false;

    try {
      const result = await User.findAndCount({
        where: {
          email: userToReg.email,
        },
      });
      if (result.count > 0) {
        logger.info(`количество совпадений email ${result.count}`);
        emailFound = true;
      }
    } catch (error) {
      logger.error('Ошибка проверки имени пользователя', error);
    }


    if (loginFound) {
      res.status(400).send('Пользователь с данным логином существует');
      logger.info('Пользователь с данным логином существует');
      emailFound = false;
    }

    if (emailFound) {
      res.status(400).send('Данный email уже используется');
      logger.info('Данный email уже используется');
    }


    const sum = !emailFound && !loginFound;
    logger.info(`loginFound: ${loginFound} emailFound ${emailFound} sum ${sum}`);

    if (!emailFound && !loginFound) {
      try {
        await User.create(userToReg);
        res.status(200).send('Регистрация прошла успешно');
      } catch (error) {
        logger.error('Ошибка сохранения', error);
        res.status(404).send('Возникла ошибка при регистрации');
      }
    }
  } else {
    res.status(400).send('Не верные данные для регистрации');
  }
}
