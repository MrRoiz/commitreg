const { ipcMain } = require('electron')
const UserConfig = require('../models/UserConfig')
const Developer = require('../models/Developer')

module.exports = ipcMain.on('getUserConfig',async (event)=>{
	let foundUserConfig = await UserConfig.findOne({
		include : Developer
	})
	
	let response = foundUserConfig ? foundUserConfig.toJSON() : null

	event.reply('gottenUserConfig',response)
})