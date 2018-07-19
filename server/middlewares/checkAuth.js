const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/configFile');


router.use((req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, config.secretForToken, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Ошибка проверки ключа',
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Отсутствует токен',
    });
  }
});

module.exports = router;
