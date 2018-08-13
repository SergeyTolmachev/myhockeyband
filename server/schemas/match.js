const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConnect');

const Match = sequelize.define('matches', {
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
  createdTime: {
    type: Sequelize.DATE,
  },
  createdById: {
    type: Sequelize.INTEGER,
  },
}, {
  timestamps: false,
});


module.exports = Match;
