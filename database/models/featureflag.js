'use strict'

const { DataTypes } = require('sequelize')
const Sequelize = require('./index')

const FeatureFlag = Sequelize.define('FeatureFlag',{
	feature : {
		type : DataTypes.STRING
	},
    icon : {
        type : DataTypes.STRING
    },
	route : {
		type : DataTypes.STRING
	},
    status : {
		type : DataTypes.STRING
	}
},{
	paranoid : true
})

module.exports = FeatureFlag