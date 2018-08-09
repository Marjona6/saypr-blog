module.exports = app => {
	require('./routes/users')(app);
	require('./routes/articles')(app);

	// 404 for anything else
	app.get('*', require('./routes/404')); 
}
