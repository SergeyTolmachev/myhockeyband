const express = require('express');

const router = express.Router();
const User = require('../models/user');
const logger = require('../utils/logger');



router.use(async (req, res, next) => {

  try {
    const result = await User.findAndCount({
      where: {
        login: req.body.decoded.login,
      },
    });
    if (result.count >= 0){
      next();
    }

    res.status(401).send('Ошибка проверки имени пользователя');
    logger.error('Ошибка проверки имени пользователя');
  } catch (error) {
    res.status(404).send('Ошибка проверки имени пользователя');
    logger.error('Ошибка проверки имени пользователя', error);
  }
});

module.exports = router;
