'use strict'

const { DataTypes } = require('sequelize')
const Sequelize = require('./index')

const Module = Sequelize.define('Module',{
	name : {
		type : DataTypes.STRING
	},
    description : {
        type : DataTypes.STRING
    },
	repository_id : {
		type : DataTypes.INTEGER
	}
},{
	paranoid : true
})

module.exports = Module