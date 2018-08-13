const express = require('express');

const router = express.Router();
const playerController = require('../controllers/playerController');

router.get('/:playerId', playerController.getPlayerData);
router.get('/', playerController.getAllPlayersData);

module.exports = router;
