module.exports = (sequelize, connection) =>{
	return connection.define('countrylanguage', {
		CountryCode:
			{
				primaryKey: true,
				type: sequelize.STRING(3),
				allowNull: false,
				defaultValue: ''
			},
		Language:
			{
				primaryKey: true,
				type: sequelize.STRING(35),
				allowNull: false,
				defaultValue: ''
			},
		IsOfficial:
			{
				type: sequelize.ENUM('T','F'),
				allowNull: false,
				defaultValue: 'F'
			},
		Percentage:
			{
				type: sequelize.FLOAT,
				allowNull: false,
				defaultValue: 0.0
			}
	});
};