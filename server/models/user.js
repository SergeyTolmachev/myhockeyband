const Sequelize = require('sequelize');
const sequelize = require('../config/databaseConnect');

const User = sequelize.define('users', {
  login: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true,
    },
  },
  name: {
    type: Sequelize.STRING,
  },
  surname: {
    type: Sequelize.STRING,
  },
  nickname: {
    type: Sequelize.STRING,
  },
  birthday: {
    type: Sequelize.DATE,
    validate: {
      isDate: true,
    },
  },
}, {
  timestamps: false,
});

module.exports = User;
