// import User from '../models/user';
const User = require('../models/user');

const sequelize = require('sequelize');
// const faker = require('faker');
// const { body } = require('express-validator/check');
// add more from express-validator to validate all data for creating docs

module.exports = app => {
	app
		// get all users
		.get('/users', async (req, res) => {
			// todo
		})

		// get user by user ID
		.get('/users/:id', async (req, res) => {
			// todo
		})

		// create a new user
		.post('/users/new', async (req, res) => {
			// todo
			User
				.create({ username: req.body.username, password: req.body.password })
				.then(user => {
					res.status(200).json({
						user
					})
				})
				.catch(err => {
					console.error(err);
					res.json({
						error: err
					});
				});
		})

		// update a user
		.put('/users/:id', async (req, res) => {
			// todo
		})

		// delete a user
		.delete('/users/:id', async (req, res) => {
			// todo
		})
}
