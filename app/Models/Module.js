const { DataTypes } = require('sequelize')
const Sequelize = require('../../db/index')

const Module = Sequelize.define('Module',{
	name : {
		type : DataTypes.STRING
	},
    description : {
        type : DataTypes.STRING
    },
	id_repository : {
		type : DataTypes.NUMBER
	}
},{
	paranoid : true
})

module.exports = Module