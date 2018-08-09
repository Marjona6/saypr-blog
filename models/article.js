module.exports = (sequelize, DataTypes) => {
	let Article = sequelize.define('Article', {
		title: DataTypes.STRING,
		text: DataTypes.TEXT,
		tags: {
			type: DataTypes.ARRAY,
			get() {
				return this.getDataValue('tags').split(';');
			},
			set(val) {
				this.setDataValue('tags', val.join(';'));
			}
		},
		category: DataTypes.STRING,
	});

	Article.associate = models => {
		models.Article.belongsTo(models.User, {
			// todo?
		});
	};

	return Article;
}