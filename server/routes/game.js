const express = require('express');

const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const gameController = require('../controllers/gameController');



router.get('/:gameId', gameController.getGameData);
router.get('/allGames/:playerId', gameController.getAllGameData);

//пути требующие авторизации

router.post('/create', checkAuth, gameController.createGame);

//router.put('/update', checkAuth, gameController.updateGame); Временно не работает до появления супер админа


module.exports = router;
