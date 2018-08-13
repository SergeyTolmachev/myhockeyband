const teamStats = require('../models/teamStats');
const logger = require('../utils/logger');
const HTTPSRequest = require('../utils/HTTPSRequest');
const TeamsNHL = require('../schemas/teamsNHL');

module.exports.getStats = async (req, res) => {
  const teamId = req.params.teamId;
  if ((typeof (+teamId) === 'number') && (teamId >= 1) && (teamId <= 54)) {
    let data = await teamStats.getData(teamId);
    if (!data) {
      logger.info('Запрос отправлен на апи NHL');
      data = await HTTPSRequest.getRequest(`https://statsapi.web.nhl.com/api/v1/teams/${teamId}/stats`);
      await teamStats.setData(teamId, data);
      data = JSON.parse(data);
    }
    res.status(200).json(data);
  } else {
    res.status(404).send('неверные данные для запроса');
  }
};

module.exports.getAllTeams = async (req, res) => {
  let data = await TeamsNHL.findAndCount();
  if (!data) {
    res.status(404).json({message: 'список конанд не найден'});
  }
  res.status(200).json(data);
};
