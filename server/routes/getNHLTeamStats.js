const express = require('express');

const logger = require('../utils/logger');
const HTTPSRequest = require('../utils/HTTPSRequest');


const router = express.Router();
const teamStats = require('../models/teamStats');

router.get('/:teamId', async (req, res) => {
  const teamId = req.params.teamId;
  let data = await teamStats.getData(teamId);
  if (!data) {
    logger.info('Запрос отправлен на апи NHL');
    data = await HTTPSRequest.getRequest(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}/stats`);
    await teamStats.setData(teamId, data);
    data = JSON.parse(data);
  }
  res.status(200).json(data);
});


module.exports = router;
