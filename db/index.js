const { Sequelize } = require('sequelize');
const config = require('./config.json')

const sequelize = new Sequelize({
	dialect : config.dialect,
	storage : config.storage
})

module.exports = sequelize