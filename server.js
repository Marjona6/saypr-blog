const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const port = process.env.PORT || 7734;

const server = require('http').createServer(app);

const config = require('./config/config.json');

// require('./routes')(app);

const { User, Article, Tag } = require('./sequelize');

app
    // get all articles
    .get('/articles', async (req, res) => {
      // todo
      Article
        .findAll({})
        .then(articles => {
          res.status(200).json(articles);
        })
        .catch(err => {
          console.error(err);
          res.json({
            error: err
          });
        });
    });

server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

module.exports = { app };