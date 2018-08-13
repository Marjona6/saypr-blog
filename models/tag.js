module.exports = (sequelize, DataTypes) => {
	let Tag = sequelize.define('Tag', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true, // I have no idea what any of this is
		},
		name: DataTypes.STRING,
	});

	Tag.associate = models => {
		// a tag can have many articles and an article can have many tags
		models.Tag.hasMany(models.Article);
	};

	return Tag;
}