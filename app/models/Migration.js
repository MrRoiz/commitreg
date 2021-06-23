// import { DataTypes } from 'sequelize'
// import Sequelize from '../../db/index'

const { DataTypes } = require('sequelize')
const Sequelize = require('../../db/index')

const Migration = Sequelize.define('Migration',{
	migration : {
		type : DataTypes.STRING
	},
	executed : {
		type : DataTypes.INTEGER
	}
})

module.exports = Migration
// export default Migration