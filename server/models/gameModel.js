const moment = require('moment');
const Game = require('../schemas/game');
const logger = require('../utils/logger');


class GameModel {
  async checkGameToUpdate(gameId) {
    try {
      const lastGameByUser = await Game.findAndCount({
        where: {
          id: gameId,
        },
      });
      if (lastGameByUser.count <= 0) {
        return false;
      }
      if (lastGameByUser.rows[0].dataValues.gameStatus === 'pending') {
        return true;
      }
      if (lastGameByUser.rows[0].dataValues.gameStatus === 'waiting') {
        return true;
      }
      return false;
    } catch (error) {
      logger.error('Ошибка проверкf игры на возможность обновлентя GameClass.CheckGameToUpdate');
    }
  }

  async checkGameTimeCreated(createdById) {
    try {
      const lastGameByUser = await Game.max('createdAtTime', {
        where: {
          createdById,
        },
      });
      let theCurrentDateTime = new Date();
      if (lastGameByUser === null) { return true }
      if (lastGameByUser) {
        theCurrentDateTime = Date.parse(theCurrentDateTime) - Date.parse(lastGameByUser);
        if (theCurrentDateTime >= (5 * 60 * 1000)) {
          return true;
        }
      }
      return false;
    } catch (error) {
      logger.error('Ошибка проверка даты создания игры GameClass.checkGameTimeCreated', error);
    }
  }

  async checkDataToCreateGame(data) {
    if (data.playerId != parseInt(data.playerId)) { return true; }
    if (data.teamId != parseInt(data.teamId)) { return true; }
    if (data.goals != parseInt(data.goals)) { return true; }
    if (data.shoots != parseInt(data.shoots)) { return true; }
    if (data.hits != parseInt(data.hits)) { return true; }
    if (moment.isDate(data.timeInAttack)) { return true; }
    if (data.passes != parseFloat(data.passes)) { return true; }
    if (moment.isDate(data.penaltyTime)) { return true; }
    if (!data.powerPlays) { return true; }
    if (!data.faceToFace) { return true; }
    if (!data.minorityGoals) { return true; }
    return false;
  }

  async createGame(gameToCreate) {
    try {
      await Game.create(gameToCreate);
      return true;
    } catch (error) {
      logger.error('Ошибка при создании игры, GameClass.createGame', error);
    }
  }


  async getGameData(gameId) {
    try {
      const gameData = await Game.findAndCount({
        where: {
          gameId,
        },
      });
      if (gameData.count > 0) {
        let result = [gameData.rows[0].dataValues, gameData.rows[1].dataValues];
        return result;
      }
      return false;
    } catch (error) {
      logger.error('Ошибка получнеия данных об игре GameClass.getGameData', error);
    }
  }


  async updateGame(gameId, gameToUpdate) {
    try {
      for (const key in gameToUpdate) {
        if (gameToUpdate[key] === null || !gameToUpdate[key]) {
          return false;
        }
      }
      await Game.update(gameToUpdate, {
        where: {
          id: gameId,
        },
      });
      return true;
    } catch (error) {
      logger.error('Ошибка при обновлении игры, GameClass.updateGame', error);
    }
  }
}

module.exports = new GameModel();
