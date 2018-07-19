const express = require('express');

const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');


router.use(checkAuth);

router.post('/', async (req, res, next) => {
  res.status(200).send('Добро пожаловать на секретную страницу');
});


module.exports = router;
