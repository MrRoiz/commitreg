const { DataTypes } = require('sequelize')
const Sequelize = require('../../db/index')

const Branch = Sequelize.define('Branch',{
	name : {
		type : DataTypes.STRING
	},
    description : {
        type : DataTypes.STRING
    }
},{
	paranoid : true
})

module.exports = Branch