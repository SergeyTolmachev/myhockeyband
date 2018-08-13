const jwt = require('jsonwebtoken');
const Game = require('../schemas/game');
const User = require('../schemas/user');
const logger = require('../utils/logger');
const config = require('../config/configFile');
const hash = require('../utils/hash');


class UserModel {
  async checkPlayerExists(playerLogin) {
    try {
      const result = await User.findAndCount({
        where: {
          login: playerLogin,
        },
      });
      if (result.count > 0) {
        return result.rows[0].dataValues.id;
      }
      return false;
    } catch (error) {
      logger.error('Ошибка проверка наличия игрока GameClass.CheckPlayerExists', error);
    }
  }

  async checkCorrectPassword(playerId, password) {
    try {
      const result = await User.findAndCount({
        where: {
          id: playerId,
        },
      });
      if (await hash.getHash(password, result.rows[0].dataValues.password)) {
        return true;
      }
      return false;
    } catch (error) {
      logger.error('Ошибка проверка наличия игрока GameClass.CheckPlayerExists', error);
    }
  }

  async checkEmailExists(email) {
    try {
      const result = await User.findAndCount({
        where: {
          email,
        },
      });
      if (result.count > 0) {
        return result.rows[0].dataValues.id;
      }
      return false;
    } catch (error) {
      logger.error('Ошибка проверка наличия email GameClass.CheckEmailExists', error);
    }
  }

  async checkCorrectEmail(email) {
    try {
      const result = /^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/.test(email);
      if (result) { return false; } return true;
    } catch (error) {
      logger.error('Email не соответствует формату электронной почты', error);
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

  async getUserData(userId) {
    try {
      const userData = await User.findAndCount({
        where: {
          id: userId,
        },
        attributes: {
          exclude: ['password'],
        }
      });
      if (userData.count > 0) {
        return userData.rows[0];
      }

      return false;
    } catch (error) {
      logger.error('Ошибка получнеия данных о пользователе GameClass.getUserData', error);
    }
  }

  async getAllUsersData(){
    try {
      const usersData = await User.findAndCount({
        attributes: ['id', 'login'],
      });
      return usersData.rows;
    } catch (error) {
      logger.error('Ошибка получения данных пользователей UserClass.getAllUsersData', error);
    }
  }
}

module.exports = new UserModel();
