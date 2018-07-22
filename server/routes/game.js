const express = require('express');

const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const gameController = require('../controllers/gameController');



router.use(checkAuth);

router.post('/create', gameController.createGame);

router.put('/update', gameController.updateGame);


module.exports = router;
