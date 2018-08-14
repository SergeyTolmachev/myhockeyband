const express = require('express');

const router = express.Router();

const checkAuth = require('../middlewares/checkAuth');

router.ws('/', checkAuth, async (req, res) => {
  ws.on('connection',)
});


module.exports = router;
