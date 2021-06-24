const { ipcMain } = require('electron')
const UserConfig = require('../models/UserConfig')

module.exports = ipcMain.on('saveConfig',async (event,config)=>{
	let savedConfig = await UserConfig.create({
		username: config.name,
		theme   : config.theme
	})

	event.reply('savedConfig', {
		username: savedConfig.username,
		theme   : savedConfig.theme
	})
})