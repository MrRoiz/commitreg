const { DataTypes } = require('sequelize')
const Sequelize = require('../../db/index')
const Developer = require('./Developer')

const UserConfig = Sequelize.define('UserConfig',{
	theme : {
		type : DataTypes.STRING
	},
	id_developer : {
		type : DataTypes.INTEGER
	}
},
{
	paranoid : true,
	tableName : 'user_config'
})

UserConfig.belongsTo(Developer,{
	foreignKey : 'id_developer'
})

module.exports = UserConfig