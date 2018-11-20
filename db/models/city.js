module.exports = (sequelize, connection) =>{
	return connection.define('city', {
		ID:
			{
				type: sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true
			},
		Name:
			{
				type: sequelize.STRING(35),
				allowNull: false,
				defaultValue: ''
			},
		CountryCode:
			{
				type: sequelize.STRING(3),
				allowNull: false,
				defaultValue: ''
			},
		District:
			{
				type: sequelize.STRING(20),
				allowNull: false,
				defaultValue: ''
			},
		Population:
			{
				type: sequelize.INTEGER,
				allowNull: false,
				defaultValue: 0
			}
	});
};