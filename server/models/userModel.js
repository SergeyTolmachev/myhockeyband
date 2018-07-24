const jwt = require('jsonwebtoken');
const Game = require('../schemas/game');
const User = require('../schemas/user');
const logger = require('../utils/logger');
const config = require('../config/configFile');


class UserModel {
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

  async getToken(login) {
    const token = jwt.sign({
      login,
    },
    config.secretForToken, {
      expiresIn: '1h',
    });
    return token;
  }


  async checkCreator(userId, gameId) {
    try {
      const lastGameByUser = await Game.findAndCount({
        where: {
          id: gameId,
        },
      });
      if (lastGameByUser.count <= 0) {
        return false;
      }
      if (userId === lastGameByUser.rows[0].dataValues.createdById) {
        return true;
      }
      return false;
    } catch (error) {
      logger.error('Ошибка проверка создателя игры GameClass.CheckCreator', error);
    }
  }
}

module.exports = new UserModel();
