'use strict'

const { DataTypes } = require('sequelize')
const Sequelize = require('./index')

const Repository = Sequelize.define('Repository',{
	name : {
		type : DataTypes.STRING
	},
	description : {
		type : DataTypes.STRING
	}
},
{
	paranoid : true,
})

module.exports = Repository