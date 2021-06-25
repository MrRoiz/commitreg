const { ipcMain } = require('electron')
const Developer = require('../models/Developer')
const UserConfig = require('../models/UserConfig')

module.exports = ipcMain.on('saveConfig',async (event,config)=>{
	try{
		let mainUserDeveloper = await Developer.create({
			name : config.name
		})
	
		await UserConfig.create({
			theme       : config.theme,
			id_developer: mainUserDeveloper.id
		})

		let createdUserConfig = await UserConfig.findOne({
			include : Developer
		})

		event.reply('savedConfig', createdUserConfig.toJSON())
	}catch(error){
		console.log(error)
	}

})