const { ipcMain } = require('electron')
const UserConfig = require('../models/UserConfig')

module.exports = ipcMain.on('getUserConfig',async (event)=>{
	event.reply('gottenUserConfig', await UserConfig.findOne())
})