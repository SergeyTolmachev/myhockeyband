const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConnect');

const TeamsNHL = sequelize.define('teams', {
  name: {
    type: Sequelize.CHAR,
  },
  teamName: {
    type: Sequelize.CHAR,
  },
  locationName: {
    type: Sequelize.CHAR,
  },
  firstYearOfPlay: {
    type: Sequelize.INTEGER,
  },
  abbreviation: {
    type: Sequelize.CHAR,
  },
  divisionId: {
    type: Sequelize.INTEGER,
  },
  conferenceId: {
    type: Sequelize.INTEGER,
  },
  officialSiteUrl:{
    type: Sequelize.CHAR,
  },
  logo:{
    type: Sequelize.CHAR,
  },
  backColor: {
    type: Sequelize.CHAR,
  },
}, {
  timestamps: false,
});


module.exports = TeamsNHL;
