const express = require('express');

const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const playerController = require('../controllers/playerController');

router.put('/update/', checkAuth, playerController.updatePlayerData);
router.get('/', playerController.getAllPlayersData);
router.get('/statistic/', playerController.getAllPlayersStatistic);
router.get('/:playerId', playerController.getPlayerData);


module.exports = router;
