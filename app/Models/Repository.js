const { DataTypes } = require('sequelize')
const Sequelize = require('../../db/index')

const Repository = Sequelize.define('Repository',{
	name : {
		type : DataTypes.STRING
	},
	description : {
		type : DataTypes.INTEGER
	}
},
{
	paranoid : true,
})

module.exports = Repository