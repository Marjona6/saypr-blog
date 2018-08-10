const Sequelize = require('sequelize');
const UserModel = require('./models/user');
const ArticleModel = require('./models/article');
const TagModel = require('./models/tag');

const config = require('./config/config.json');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
  host: config.development.host, // https://app.sqldbm.com/MySQL/Share/FXnhf2xKTgzv_mOk07YF5EGFrngIE8md_DYjF4jNYw0
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
});

const User = UserModel(sequelize, Sequelize);
const ArticleTag = sequelize.define('article_tag', {});
const Article = ArticleModel(sequelize, Sequelize);
const Tag = TagModel(sequelize, Sequelize);

Article.belongsToMany(Tag, { through: ArticleTag, unique: false });
Tag.belongsToMany(Article, { through: ArticleTag, unique: false });
Article.belongsTo(User);

sequelize.sync({ force: false })
	.then(() => {
		console.log('Database and tables created!');
	})
	.catch(err => {
		console.error('Error creating database and tables.');
	});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = { User, Article, Tag };