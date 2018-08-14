const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConnect');

const Statistic = sequelize.define('usersStats', {
  playerId: {
    type: Sequelize.INTEGER,
  },
  gamesPlayed: {
    type: Sequelize.INTEGER,
  },
  wins: {
    type: Sequelize.INTEGER,
  },
  loses: {
    type: Sequelize.INTEGER,
  },
  goalsPerGame: {
    type: Sequelize.FLOAT,
  },
  goalsAgainstPerGame: {
    type: Sequelize.FLOAT,
  },
  shootsPerGame: {
    type: Sequelize.FLOAT,
  },
  shootsPctg: {
    type: Sequelize.FLOAT,
  },
  savePctg: {
    type: Sequelize.FLOAT,
  },
  faceToFacePerGame: {
    type: Sequelize.FLOAT,
  },
  faceToFacePctg: {
    type: Sequelize.FLOAT,
  },
  powerPlaysPerGame: {
    type: Sequelize.FLOAT,
  },
  powerPlaysPctg: {
    type: Sequelize.FLOAT,
  },
}, {
  timestamps: false,
});


module.exports = Statistic;
