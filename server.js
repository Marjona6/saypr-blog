const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const uuidv4 = require('uuid/v4');

const app = express();

const port = process.env.PORT || 7734;

const server = require('http').createServer(app);

const config = require('./config/config.json');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(session({ secret: 'saypr-blog-awesome'}));

// passport & authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use('local', new LocalStrategy( async (username, password, done) => {
  try {
    const user = await User.find({ where: { username: username }});
    if (!user) {
      return done(null, false, { message: 'Invalid username!' });
    }
    // todo: fix the password comparison
    // bcrypt.compare(req.body.password, )
    // if () {
    //   console.log(user);
    //   return done(null, false, { message: 'Invalid password!' });
    // }

    return done(null, user);
  }
  catch (error) {
    console.error(error);
    return done(error);
  }
}));
passport.serializeUser( (user, done) => {
  done(null, user.id);
});
passport.deserializeUser( async (id, done) => {
  await User.find({ where: {id: id} });
  done(err, user);
});

// require('./routes')(app);

const { User, Article, Tag } = require('./sequelize');

app
    // ARTICLES
    // get all articles
    .get('/articles', async (req, res) => {
      try {
        let articles = await Article.findAll({});
        res.status(200).json(articles);
      }
      catch (err) {
        console.error(err);
        res.json({
          error: err
        });
      }
    })

    // get article by article ID
    .get('/article/:id', async (req, res) => {
      try {
      let article = await Article.find({ where: {id: req.params.id} });
      res.status(200).json(article);
      }
      catch (err) {
        console.error(err);
        res.json({
          error: err
        });
      }
    })

    // get articles by category
    .get('/articles/:category', async (req, res) => {
      // todo
      try {
        let articles = await Article.find({ where: { category: req.params.category }});
        res.status(200).json({ articles });
      }
      catch (error) {
        console.error(error);
        res.json({
          error: error
        });
      }
    })

    // create new article
    .post('/articles/new', async (req, res) => {
      try {
        const article = await Article.create({
          id: uuidv4(),
          title: req.body.title,
          text: req.body.text,
          tags: req.body.tags,
          category: req.body.category,
          // UserId: // store the userId from req.session here (but it still needs to be set at login)
        });
        console.log('New article has been created successfully.');
        res.status(200).json({ message: 'New article has been created successfully.'});
      }
      catch (error) {
        console.error(error);
        res.json({
          error: error
        });
      }
    })

    // update existing article by ID
    .put('/article/:id', async (req, res) => {
      // get data to be updated from request
      let { id, title, text, tags, category } = req.body;
      Article.update(
        {
          title: updatedTitle,
          text: updatedText,
          tags: updatedTags,
          category: updatedCategory,
        },
        {
          returning: true,
          where: { id: req.params.id }
        }
      )
      .then( ( [rowsUpdated, [updatedArticle] ] ) => {
        res.status(200).json(updatedArticle);
      })
      .catch(err => {
        console.error(err);
        res.json({
          error: err
        });
      });
       
    })

    // delete an existing article by article ID
    .delete('/article/:id', async (req, res) => {
      try {
        await Article.destroy({ where: {id: req.params.id }});
        res.status(200).json({
          message: 'Article successfully deleted.'
        });
      }
      catch (err) {
        console.error(err);
        res.json({
          error: err
        });
      }
    })

    // USERS

    // log in
    .post('/login', passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }), async (req, res) => {      
      // try {
      //   let user = await User.find({ where: {username: req.body.username}});
      //   if (!user) {
      //     res.status(404).json({
      //       message: 'No such username'
      //     });
      //   } else {
      //     user.validatePassword(req.body.password, (err, isValid) => {
      //       if (err) {
      //         console.error('Error validating password:', err);
      //       }
      //       if (!isValid) {
      //         return res.status(401).json({
      //           message: 'Not found'
      //         });
      //       } else {
      //         let loginTime = new Date();
      //         console.log(`User ${req.body.username} logged in at ${loginTime}.`);
      //         req.session.userId = user.id;
      //         res.status(200).json({
      //           message: 'Logged in successfully'
      //         });
      //       }
      //     });
      //   }
      // }
      // catch (error) {
      //   console.error(error);
      //   res.json({
      //     error: error
      //   });
      // }
    })

    // log out
    // todo

    // get all users
    .get('/users', async (req, res) => {
      try {
        let users = await User.findAll({});
        res.status(200).json(users);
      }
       catch (err) {
        console.error(err);
        res.json({
          error: err
        });
      }
    })

    // get user by username
    .get('/user/:username', async (req, res) => {
      try {
        let user = await User.find({ where: {username: req.params.username} });
        res.status(200).json(user);
      }
      catch (err) {
        console.error(err);
        res.json({
          error: err
        });
      }
    })

    // todo: get user by user ID?

    // create new user
    .post('/users/new', async (req, res) => {
      try {
        const BCRYPT_SALT_ROUNDS = 12;
        let id = uuidv4();
        let username = req.body.username;
        let password = req.body.password;
        let hashedPassword = await bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
        await User.create({ id: id, username: username, password: hashedPassword });
        console.log('Successfully created new user');
        res.status(200).json({
          message: 'Successfully created new user'
        });
      }
      catch (err) {
          console.error(err);
          res.json({
            error: err
          });
      }
    })
    ;

server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

module.exports = { app };