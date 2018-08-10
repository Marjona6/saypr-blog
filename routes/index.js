// const models  = require('../models');
// const express = require('express');
// let router  = express.Router();

// router.get('/', (req, res) => {
//   models.User.findAll({
//     include: [ models.Article ]
//   }).then(users => {
//     res.render('index', {
//       title: 'Saypr-Blog: Users',
//       users: users
//     });
//   });
// });

const routes = [
	require('./users'),
	require('./articles')
];

// Add access to the app and db objects to each route

router = (app, db) => {
	return routes.forEach(route => {
		route(app, db);
	});
};

// module.exports = router;