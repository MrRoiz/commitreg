const { DataTypes } = require('sequelize')
const Sequelize = require('../../db/index')

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
	tableName : 'feature_flags',
	paranoid : true
})

module.exports = FeatureFlag