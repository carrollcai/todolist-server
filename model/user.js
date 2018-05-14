/**
 * 用户表
 */
const Sequelize = require('sequelize');
const model = require('./index');

const conf = {
  account: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
    validate: {
      len: [6, 18]
    }
  },
  password: {
    type: Sequelize.STRING,
    validate: {
      len: [6, 18]
    }
  },
  nickname: {
    type: Sequelize.STRING,
    validate: {
      len: [2, 18]
    }
  }
};

const user = model.define('user', conf);

module.exports = {
  conf,
  model: user
};