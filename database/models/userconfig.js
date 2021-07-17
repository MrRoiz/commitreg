'use strict'

const { DataTypes } = require('sequelize')
const Sequelize = require('./index')
const Developer = require('./developer')

const UserConfig = Sequelize.define('UserConfig',{
	theme : {
		type : DataTypes.STRING
	},
	developer_id : {
		type : DataTypes.INTEGER
	}
},
{
	paranoid : true
})

UserConfig.belongsTo(Developer,{
	foreignKey : 'developer_id'
})

module.exports = UserConfig