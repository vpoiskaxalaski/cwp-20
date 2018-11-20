const express = require('express');
const Sequelize = require('sequelize');
const db = require('../db/db')(Sequelize);

const Handlebars = require('handlebars');

Handlebars.registerHelper('listLinks', function(itemsCount, page) {
	let out = '';
	for(var i = 1; i <= itemsCount; i++) {
		let current = page == i ? 'style=color:red' : '';
		out = out + "<a href='countries?page=" + i + "' " + current + ">" + i + "</a> ";
	}
	return new Handlebars.SafeString(
		out
	);
});

Handlebars.registerHelper('countMans', function(lang) {
	return new Handlebars.SafeString(
		Math.ceil(lang.elem.dataValues.Percentage * lang.country1.Population / 100)
	);
});

Handlebars.registerHelper('TF', function(data) {
	return new Handlebars.SafeString(
		data === 'F' ? 'нет' : 'да'
	);
});
const app = express.Router();


app.get('/', (req, res) =>
{
	console.log(req.url);
	let page = req.query.page ? req.query.page: 1;
	(db.country.findAll())
		.then((countries) =>
		{
			res.locals = {
				layout: 'countries',
				pageNumber: page,
				pageCounter1: 25 * (page - 1) + 1,
				pageCounter2: 25 * page,
				countries: countries.slice(25 * (page - 1), 25 * page),
				countPages: Math.ceil(countries.length / 25)
			};
			res.render('index');
		});
});


app.get('/[A-Z][A-Z][A-Z]/', (req, res) =>
{
	console.log(req.url);
	async function func()
	{
		let country = await db.country.findAll({where: {Code: req.url.slice(1)}});
		let capital = await db.city.findByPk(country[0].dataValues.Capital);
		let cities = await db.city.findAll({where: {CountryCode: req.url.slice(1)}, limit: 3, order:[['Population', 'DESC']]});
		let languages = await db.countryLanguage.findAll({where: {CountryCode: req.url.slice(1)}, limit: 3, order: [['Percentage', 'DESC']]});
		let country1 = country[0].dataValues;
		let countOfCities = (await db.city.findAll({where: {CountryCode: req.url.slice(1)}})).length;

		res.render('index',
			{
				layout: 'country',
				country: country1,
				capital: capital.dataValues,
				cities: cities,
				countOfCities: countOfCities,
				languages: languages.map((elem) => elem = {elem, country1})
			});
	}
	func();
});

module.exports = app;