const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConnect');

const Game = sequelize.define('games', {
  gameDate: {
    type: Sequelize.DATE,
  },
  gameStatus: {
    type: Sequelize.STRING,
  },
  playerGuestId: {
    type: Sequelize.INTEGER,
  },
  playerHomeId: {
    type: Sequelize.INTEGER,
  },
  teamGuestId: {
    type: Sequelize.INTEGER,
  },
  teamHomeId: {
    type: Sequelize.INTEGER,
  },
  goalsGuest: {
    type: Sequelize.INTEGER,
  },
  goalsHome: {
    type: Sequelize.INTEGER,
  },
  shootsGuest: {
    type: Sequelize.INTEGER,
  },
  shootsHome: {
    type: Sequelize.INTEGER,
  },
  hitsGuest: {
    type: Sequelize.INTEGER,
  },
  hitsHome: {
    type: Sequelize.INTEGER,
  },
  timeInAttackGuest: {
    type: Sequelize.INTEGER,
  },
  timeInAttackHome: {
    type: Sequelize.INTEGER,
  },
  passesGuest: {
    type: Sequelize.FLOAT,
  },
  passesHome: {
    type: Sequelize.FLOAT,
  },
  penaltyTimeGuest: {
    type: Sequelize.TIME,
  },
  penaltyTimeHome: {
    type: Sequelize.TIME,
  },
  powerPlaysGuest: {
    type: Sequelize.INTEGER,
  },
  powerPlaysDoneGuest: {
    type: Sequelize.INTEGER,
  },
  powerPlaysHome: {
    type: Sequelize.INTEGER,
  },
  powerPlaysDoneHome: {
    type: Sequelize.INTEGER,
  },
  faceToFaceGuest: {
    type: Sequelize.INTEGER,
  },
  faceToFaceDoneGuest: {
    type: Sequelize.INTEGER,
  },
  faceToFaceHome: {
    type: Sequelize.INTEGER,
  },
  faceToFaceDoneHome: {
    type: Sequelize.INTEGER,
  },
  minorityGoalsGuest: {
    type: Sequelize.INTEGER,
  },
  minorityGoalsHome: {
    type: Sequelize.INTEGER,
  },
  createdById: {
    type: Sequelize.INTEGER,
  },
  createdAtTime: {
    type: Sequelize.DATE,
  },
}, {
  timestamps: false,
});


module.exports = Game;
