/**
 * todo类型表
 */
const Sequelize = require('sequelize');
const model = require('./index');

const conf = {
  todotype: {
    type: Sequelize.STRING,
    validate: {
      len: [1, 18]
    }
  },
  sum: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  undoSum: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  }
};

const todotype = model.define('todotype', conf);

module.exports = {
  conf,
  model: todotype
};