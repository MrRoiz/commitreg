// import { DataTypes } from 'sequelize'
// import Sequelize from '../../db/index'

const { DataTypes } = require('sequelize')
const Sequelize = require('../../db/index')

const UserConfig = Sequelize.define('UserConfig',{
	username : {
		type : DataTypes.STRING
	}
},
{
	tableName : 'user_config'
})

module.exports = UserConfig
// export default UserConfig