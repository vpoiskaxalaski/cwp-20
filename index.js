const express = require('express');
const Sequelize = require('sequelize');
const hbs = require('express-handlebars');
const Handlebars = require('handlebars');
const db = require('./db/db')(Sequelize);

const app = express();

app.engine('hbs', hbs({
	extname: 'hbs',
	defaultLayout: 'main',
	layoutsDir: __dirname + '/views/layouts/',
	partialsDir: __dirname + '/views/partials/'
}));


Handlebars.registerHelper('link', function(object) {
	var url = Handlebars.escapeExpression(object.url),
		text = Handlebars.escapeExpression(object.text);

	return new Handlebars.SafeString(
		"<a href='" + url + "'>" + text + "</a>"
	);
});

app.set('view engine', 'hbs');

app.use('/countries', require('./routers/countries'));
app.use('/cities', require('./routers/cities'));

app.get('/', (req, res) => {
	console.log(req.url);
	let countriesCount = 0, citiesCount = 0;
	(db.country.findAll()).then((data) =>
	{
		countriesCount = data.length;
		(db.city.findAll()).then((data) =>
		{
			citiesCount = data.length;
			res.locals = {
				title: 'Title',
				countries: {
					url: '/countries.html',
					text: `Countries ${countriesCount}`
				},
				cities: {
					url: '/cities.html',
					text: `Cities ${citiesCount}`
				}
			};
			res.render('index');
		});
	});
});

app.get('/countries.html', (req, res) =>
{
	res.render('countries');
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));