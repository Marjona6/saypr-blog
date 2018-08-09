module.exports = (sequelize, DataTypes) => {
	let User = sequelize.define('User', {
		username: DataTypes.STRING,
		password: DataTypes.STRING // todo: hash, encrypt, etc.
	});

	User.associate = models => {
		models.User.hasMany(models.Article);
	};

	return User;
}