const { DataTypes } = require('sequelize')
const Sequelize = require('../../db/index')

const Migration = Sequelize.define('Migration',{
	migration : {
		type : DataTypes.STRING
	},
	executed : {
		type : DataTypes.INTEGER
	}
})

module.exports = Migration