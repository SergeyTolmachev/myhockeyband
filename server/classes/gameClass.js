const Game = require('../models/game');
const User = require('../models/user');
const logger = require('../utils/logger');


class GameClass {
  async checkPlayerExists(playerLogin) {
    try {
      const result = await User.findAndCount({
        where: {
          login: playerLogin,
        },
      });
      if (result.count >= 0) {
        return result.rows[0].dataValues.id;
      }
      return false;
    } catch (error) {
      logger.error('Ошибка проверка наличия игрока GameClass.CheckPlayerExists', error);
    }
  }


  async checkCreator(userId, gameId) {
    try {
      const lastGameByUser = await Game.findAndCount({
        where: {
          id: gameId,
        },
      });
      if (lastGameByUser.count <= 0 ){
        return false
      }
      if (userId === lastGameByUser.rows[0].dataValues.createdById) {
        return true;
      }
      return false;
    } catch (error) {
      logger.error('Ошибка проверка создателя игры GameClass.CheckCreator', error);
    }
  }


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
      if (lastGameByUser) {
        theCurrentDateTime = Date.parse(theCurrentDateTime) - Date.parse(lastGameByUser);
      }
      if (theCurrentDateTime >= (5 * 60 * 1000)) {
        return true;
      }
      return false;
    } catch (error) {
      logger.error('Ошибка проверка даты создания игры GameClass.checkGameTimeCreated', error);
    }
  }

  async createGame(gameToCreate) {
    try {
      await Game.create(gameToCreate);
      return true;
    } catch (error) {
      logger.error('Ошибка при создании игры, GameClass.createGame', error);
    }
  }


  async updateGame(gameId, gameToUpdate) {
    try {
      console.log(gameToUpdate);
      for (let key in gameToUpdate){
        if (gameToUpdate[key] === null || !gameToUpdate[key]){
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

module.exports = new GameClass();
