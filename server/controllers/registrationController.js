const User = require('../schemas/user');
const hash = require('../utils/hash');
const logger = require('../utils/logger');
const userModel = require('../models/userModel');

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
      teanId: req.body.teamId || null,
    };

    if (await userModel.checkCorrectEmail(req.body.email)) {
      return res.status(400).json({ message: 'Email не соответствует формату электронной почты' });
    }

    if (await userModel.checkPlayerExists(req.body.login)) {
      return res.status(400).json({ message: 'Пользователь с данным логином существует' });
    }

    if (await userModel.checkEmailExists(req.body.email)) {
      return res.status(400).json({ message: 'Пользователь с данным email существует' });
    }

    try {
      await User.create(userToReg);
      res.status(200).send('Регистрация прошла успешно');
    } catch (error) {
      logger.error('Ошибка сохранения', error);
      res.status(404).send('Возникла ошибка при регистрации');
    }
  } else {
    res.status(400).send('Не верные данные для регистрации');
  }
};
