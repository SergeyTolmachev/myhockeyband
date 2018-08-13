const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConnect');

const Game = sequelize.define('games', {
  playerId: {
    type: Sequelize.INTEGER,
  },
  teamId: {
    type: Sequelize.INTEGER,
  },
  goals: {
    type: Sequelize.INTEGER,
  },
  shoots: {
    type: Sequelize.INTEGER,
  },
  hits: {
    type: Sequelize.INTEGER,
  },
  timeInAttack: {
    type: Sequelize.INTEGER,
  },
  passes: {
    type: Sequelize.FLOAT,
  },
  penaltyTime: {
    type: Sequelize.TIME,
  },
  powerPlays: {
    type: Sequelize.INTEGER,
  },
  powerPlaysDone: {
    type: Sequelize.INTEGER,
  },
  faceOffDone:{
    type: Sequelize.INTEGER,
  },
  minutesPowerPlay: {
    type: Sequelize.TIME,
  },
  faceToFace: {
    type: Sequelize.INTEGER,
  },
  faceToFaceDone: {
    type: Sequelize.INTEGER,
  },
  minorityGoals: {
    type: Sequelize.INTEGER,
  },
  createdById: {
    type: Sequelize.INTEGER,
  },
  createdAtTime: {
    type: Sequelize.DATE,
  },
  gameId: {
    type: Sequelize.INTEGER,
  },
  statusPlayer: {
    type: Sequelize.CHAR,
  },
}, {
  timestamps: false,
});


module.exports = Game;
