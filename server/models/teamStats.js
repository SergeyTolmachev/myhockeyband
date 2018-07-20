const redis = require('redis');

const client = redis.createClient();
const logger = require('../utils/logger');


client.on('connect', () => {
  logger.info('Подключение к Redis прошло успешно');
});


class TeamStats{
  async getData(teamId) {
    return new Promise((resolve, reject) => {
      client.get(teamId, (err, reply) => {
        if (err) {
          reject(err);
        }
        const data = JSON.parse(reply);
        resolve(data);
      });
    });
  }


  async setData(teamId, data) {
    return new Promise((resolve, reject) => {
      client.set(teamId, data, (err, reply) => {
        if (err) {
          reject(err);
        }
        resolve(reply);
      });
    });
  }
}

module.exports = new TeamStats();
