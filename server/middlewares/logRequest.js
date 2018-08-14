const express = require('express');

const router = express.Router();
const logger = require('../utils/logger');

router.use((req, res, next) => {
  logger.info(`METHOD: ${req.method} HOST: ${req.hostname} URL: ${req.url}`);
  logger.info(`BODY: ${JSON.stringify(req.body)}`);
  next();
});

module.exports = router;
