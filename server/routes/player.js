const express = require('express');

const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const playerController = require('../controllers/playerController');

router.get('/:playerId', playerController.getPlayerData);
router.put('/update/:playerId', checkAuth, playerController.updatePlayerData);
router.get('/', playerController.getAllPlayersData);

module.exports = router;
