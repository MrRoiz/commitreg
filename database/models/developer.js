'use strict'

const { DataTypes } = require('sequelize')
const Sequelize = require('./index')

const Developer = Sequelize.define('Developer',{
	name : {
		type : DataTypes.STRING
	}
},{
	paranoid : true
})

module.exports = Developer