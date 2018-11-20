const express = require('express');
const Sequelize = require('sequelize');
const db = require('../db/db')(Sequelize);

const Handlebars = require('handlebars');
const app = express.Router();

app.get('/', (req, res) =>
{
	db.city.findAll()
		.then(arr =>
		{
			let page = req.query.page ? req.query.page: 1;
			res.render('cities',
				{
					pageNumber: page,
					countries: arr.slice(25 * (page - 1), 25 * page),
					countPages: Math.ceil(arr.length / 25)
				});
		});
});

app.get('/[0-9]*/', (req, res) =>
{
	console.log(req.url);
	async function func()
	{
		let city = await db.city.findById(req.url.slice(1));
		let country = await db.country.findAll({where: {Code: city.dataValues.CountryCode}});
		let languages = await db.countryLanguage.findAll({where: {CountryCode: city.dataValues.CountryCode, IsOfficial: 'T'}});
		let capital = await db.city.findById(country[0].dataValues.Capital);

		res.render('index',
			{
				layout: 'city',
				city: city.dataValues,
				country: country[0].dataValues,
				languages: languages,
				capital: capital.dataValues,
			});

	}
	func();
});

module.exports = app;