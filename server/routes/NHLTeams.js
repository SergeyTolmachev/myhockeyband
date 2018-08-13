const express = require('express');

const router = express.Router();

const NHLTeamsController = require('../controllers/NHLTeamsController');

router.get('/stats/:teamId', NHLTeamsController.getStats);
router.get('/', NHLTeamsController.getAllTeams);


module.exports = router;
