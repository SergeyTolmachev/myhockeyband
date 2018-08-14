const Sequelize = require('sequelize');
const Statistic = require('../schemas/statistic');
const Game = require('../schemas/game');
const logger = require('../utils/logger');

class StatisticModel {
  async getAllUsersStatistic() {
    try {
      const usersData = await Statistic.findAndCount({
      });
      return usersData.rows;
    } catch (error) {
      logger.error('Ошибка получения данных пользователей StatisticModel.getAllUsersStatistic', error);
    }
  }

  async calcStatistic(playerId) {
    try {
      const statsArr = await this.findPlayerStatistic(playerId);
      const statisticTemp = { };
      statisticTemp.gamesPlayed = statsArr.count;
      statisticTemp.wins = 0;
      statisticTemp.loses = 0;
      statisticTemp.goals = 0;
      statisticTemp.goalsAgainst = 0;
      statisticTemp.shoots = 0;
      statisticTemp.shootsAgainst = 0;
      statisticTemp.faceToFace = 0;
      statisticTemp.faceToFaceDone = 0;
      statisticTemp.powerPlays = 0;
      statisticTemp.powerPlaysDone = 0;
      for (let i = 0; i < statsArr.count; i++) {
        if (statsArr.rows[i].dataValues.win === 1) {
          statisticTemp.wins = statisticTemp.wins + 1;
        } else {
          statisticTemp.loses += 1;
        }
        statisticTemp.goals += statsArr.rows[i].dataValues.goals;
        statisticTemp.goalsAgainst += statsArr.otherPlayer[i].goals;
        statisticTemp.shoots += statsArr.rows[i].dataValues.shoots;
        statisticTemp.shootsAgainst += statsArr.otherPlayer[i].shoots;
        statisticTemp.faceToFace += statsArr.rows[i].dataValues.faceToFace;
        statisticTemp.faceToFaceDone += statsArr.rows[i].dataValues.faceToFaceDone;
        statisticTemp.powerPlays += statsArr.rows[i].dataValues.powerPlays;
        statisticTemp.powerPlaysDone += statsArr.rows[i].dataValues.powerPlaysDone;
      }
      const statisticToSave = {
        playerId,
        gamesPlayed: statsArr.count,
        wins: statisticTemp.wins,
        loses: statisticTemp.loses,
        goalsPerGame: (Math.round((statisticTemp.goals / statsArr.count) * 100) / 100),
        goalsAgainstPerGame: (Math.round((statisticTemp.goalsAgainst / statsArr.count) * 100) / 100),
        shootsPerGame: (Math.round((statisticTemp.shoots / statsArr.count) * 100) / 100),
        shootsPctg: (Math.round((statisticTemp.goals / statisticTemp.shoots) * 100)),
        savePctg: (Math.round((statisticTemp.goalsAgainst / statisticTemp.shootsAgainst) * 100)),
        faceToFacePerGame: (Math.round((statisticTemp.faceToFaceDone / statsArr.count) * 100) / 100),
        faceToFacePctg: (Math.round((statisticTemp.faceToFaceDone / statisticTemp.faceToFace) * 100)),
        powerPlaysPerGame: (Math.round((statisticTemp.powerPlaysDone / statsArr.count) * 100) / 100),
        powerPlaysPctg: (Math.round((statisticTemp.powerPlaysDone / statisticTemp.powerPlays) * 100)),
      };
      await this.saveStatistic(playerId, statisticToSave);
    } catch (error) {
      logger.error('Ошибка получения данных пользователей StatisticModel.calcStatistic', error);
    }
  }

  async findPlayerStatistic(playerId) {
    try {
      const result = await Game.findAndCount({
        where: {
          playerId,
        },
      });
      result.otherPlayer = [];
      for (let i = 0; i < result.count; i++) {
        const findedRow = await Game.findAndCount({
          where: {
            gameId: result.rows[i].dataValues.gameId,
          },
        });
        result.otherPlayer = result.otherPlayer.concat(findedRow.rows[0].dataValues);
      }
      return result;
    } catch (error) {
      logger.error('Ошибка получения данных пользователей StatisticModel.findPlayerStatistic', error);
    }
  }

  async saveStatistic(playerId, dataToSave) {
    try {
      let result = await Statistic.findAndCount({
        where:{
          playerId,
        },
      });
      if (result.count > 0){
        await Statistic.update(dataToSave, {
          where: {
            playerId,
          },
        });
        return true;
      } else {
        await Statistic.create(dataToSave);
        return true;
      }

    } catch (error) {
      logger.error('Ошибка получения данных пользователей StatisticModel.reCalcStatistic', error);
    }
  }
}

module.exports = new StatisticModel();
