const City = require('./models/city');
const Country = require('./models/country');
const CountryLanguage = require('./models/countryLanguage');
const config = require('./config.json');

module.exports = (Sequelize)=>
{
	const sequelize = new Sequelize(config.db, config.login, config.password, {
		host: config.host,
		dialect: config.dialect,
		logging: false,
		port: config.port,
		define: {
			timestamps: false,
			paranoid: false,
			freezeTableName: true
		},
		options: {
			instanceName: config.dialectOptions.instanceName
		}
	});

	const city = City(Sequelize, sequelize);
	const country = Country(Sequelize, sequelize);
	const countryLanguage = CountryLanguage(Sequelize, sequelize);

	country.hasMany(city, {foreignKey: 'CountryCode', primaryKey: 'Code'});
	country.hasMany(countryLanguage, {foreignKey: 'CountryCode', primaryKey: 'Code'});

	return {
		city,
		country,
		countryLanguage,
		sequelize: sequelize,
		Sequelize: Sequelize
	};
};