module.exports = (sequelize, DataTypes) => {
	let User = sequelize.define('User', {
		id: { type: DataTypes.UUID, primaryKey: true },
		username: DataTypes.STRING,
		password: DataTypes.STRING,
	});

	User.associate = models => {
		models.User.hasMany(models.Article);
	};

	return User;
}