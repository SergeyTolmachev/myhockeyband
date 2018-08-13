const Match = require('../schemas/match');
const logger = require('../utils/logger');
const Sequelize = require('sequelize');

class MatchModel {
  async createMatch(matchToCreate) {
    try {
      const result = await Match.create(matchToCreate);
      return result.dataValues.id;
    } catch (error) {
      logger.error('Ошибка при создании игры, MatchClass.createMatch', error);
    }
  }

  async getAllMatchesData(playerId){
    try{
      let result = await Match.findAndCount({
        where: {
          playerGuestId: playerId,
        }
      });
      let arrayOfMatches = result.rows;
      result = await Match.findAndCount({
        where: {
          playerHomeId: playerId,
        }
      });
      arrayOfMatches = arrayOfMatches.concat(result.rows);
      return arrayOfMatches;
    } catch (error){
      logger.error('Ошибка выдачи всех игр GameClass.getAllGameData', error);
    }
  }
}

module.exports = new MatchModel();
