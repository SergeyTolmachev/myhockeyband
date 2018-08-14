const logger = require('../utils/logger');
const userModel = require('../models/userModel');


module.exports.authenticate = async (req, res) => {
  const userId = await userModel.checkPlayerExists(req.body.login);
  if (!userId) {
    return res.status(401).json({ message: 'Пользователь с данным логином не существует' });
  }
  if (!await userModel.checkCorrectPassword(userId, req.body.password)) {
    return res.status(401).json({ message: 'Введен неверный пароль' });
  }
  const token = await userModel.getToken(req.body.login);
  const dataToSend = {
    playerId: userId,
    success: true,
    message: 'аутентификация прошла успешно',
    token,
  };
  res.status(200).json(dataToSend);
  logger.info('аутентификация прошла успешно');
};
