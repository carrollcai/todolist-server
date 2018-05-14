let conf = require('../config/model');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

if (env === 'production') {
  modelConfig = require('../model/model-prod');
}

const sequelize = new Sequelize(conf.mysql.database, conf.mysql.user, conf.mysql.password, {
  host: conf.mysql.host,
  dialect: 'mysql',
  define: {
    charset: 'utf8',
    dialectOptions: {
      collate: 'utf8_general_ci'
    },
  },
});

module.exports = sequelize;




