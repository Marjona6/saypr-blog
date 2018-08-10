const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');

const app = express();

const port = process.env.PORT || 7734;

const server = require('http').createServer(app);

const config = require('./config/config.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// require('./routes')(app);

const { User, Article, Tag } = require('./sequelize');

app
    // ARTICLES
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
    })

    // get article by article ID
    .get('/article/:id', async (req, res) => {
      Article
        .find({ id: req.params.id })
        .then(article => {
          res.status(200).json(article);
        })
        .catch(err => {
          console.error(err);
          res.json({
            error: err
          });
        });
    })

    // create new article
    .post('/articles/new', async (req, res) => {
      Article
        .create({
          id: Sequelize.UUIDV4(),
          title: req.body.title,
          text: req.body.text,
          tags: req.body.tags,
          category: req.body.category
        })
        .then( () => {
          console.log('New article has been created successfully.');
          res.status(200).json({ message: 'New article has been created successfully.'});
        })
        .catch(err => {
          console.error(err);
          res.json({
            error: err
          });
        });
    })

    // update existing article by ID
    .put('/article/:id', async (req, res) => {
      // todo
    })

    // delete an existing article by article ID
    .delete('/article/:id', async (req, res) => {
      // todo
    })

    // USERS
    // get all users
    .get('/users', async (req, res) => {
      User
        .findAll({})
        .then(users => {
          res.status(200).json(users);
        })
        .catch(err => {
          console.error(err);
          res.json({
            error: err
          });
        });
    })

    // get user by username
    .get('/user/:username', async (req, res) => {
      User
        .find({ username: req.params.username })
        .then(user => {
          res.status(200).json(user);
        })
        .catch(err => {
          console.error(err);
          res.json({
            error: err
          });
        });
    })

    // todo: add ID field to users, get user by user ID?

    // create new user
    .post('/users/new', async (req, res) => {
      const BCRYPT_SALT_ROUNDS = 12;
      let id = uuidv4();
      let username = req.body.username;
      let password = req.body.password;
      bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        .then(hashedPassword => {
          User
            .create({ id: id, username: username, password: hashedPassword })
            .then( () => {
              console.log('Successfully created new user');
              res.status(200).json({message: 'Successfully created new user'});
            })
            .catch(err => {
              console.error(err);
              res.json({
                error: err
              });
            });
        })
        .catch(err => {
          console.error(err);
            res.json({
              error: err
            });
        });
    })
    ;

server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

module.exports = { app };