const express = require('express');
const app = express();

const port = process.env.PORT || 7734;

const server = require('http').createServer(app);

const Sequelize = require('sequelize');

const config = require('./config/config.json');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host, // https://app.sqldbm.com/MySQL/Share/FXnhf2xKTgzv_mOk07YF5EGFrngIE8md_DYjF4jNYw0
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

module.exports = app; // for testing--todo