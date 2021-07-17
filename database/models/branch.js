'use strict'

const { DataTypes } = require('sequelize')
const Sequelize = require('./index')

const Branch = Sequelize.define('Branch',{
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

module.exports = Branch