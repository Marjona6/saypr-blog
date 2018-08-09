const Article = require('../models/article');
const sequelize = require('sequelize');
// const faker = require('faker');
// const { body } = require('express-validator/check');
// add more from express-validator to validate all data for creating docs

module.exports = app => {
	app
		// get all articles
		.get('/articles', async (req, res) => {
			// todo
			await Article
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
			// todo
		})

		// create a new article
		.post('/articles/new', async (req, res) => {
			// todo
			Article
				.create({})
		})

		// update an article
		.put('/articles/:id', async (req, res) => {
			// todo
		})

		// delete an article
		.delete('/articles/:id', async (req, res) => {
			// todo
		})
}
