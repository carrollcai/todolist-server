/**
 * todo列表表
 */
const Sequelize = require('sequelize');
const model = require('./index');

const conf = {
  text: {
    type: Sequelize.TEXT,
    max: 100,
  },
  isComplete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  todotypeId: Sequelize.INTEGER,   // 外键 对应todotype表的外键
};

const todolist = model.define('todolist', conf);

module.exports = {
  conf,
  model: todolist
};