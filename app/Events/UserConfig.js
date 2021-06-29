const { ipcMain } = require('electron')
const Developer = require('../models/Developer')
const UserConfig = require('../models/UserConfig')
const Response = require('../Utils/Response')
const Validate = require('../Utils/Validate')

const events = {
	show(){
		ipcMain.on('showUserConfig',async (event)=>{
			try{
				let foundUserConfig = await UserConfig.findOne({
					include : Developer
				})
				
				let response = foundUserConfig ? foundUserConfig.toJSON() : null

				event.reply('showUserConfigResponse',Response(true,response))
			}catch(error){
				event.reply('showUserConfigResponse',Response(false,error.message))
			}
		})
	},

	store(){
		ipcMain.on('storeUserConfig',async (event,config)=>{
			try{
				Validate(config,{
					name : 'required',
					theme: 'required'
				})
	
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
		
				event.reply('storeUserConfigResponse', Response(true,createdUserConfig.toJSON()))
			}catch(error){
				event.reply('storeUserConfigResponse', Response(false,error.message))
			}
		})
	},
	
	updateTheme(){
		ipcMain.on('updateUserConfig',async (event,themeConfig)=>{
			try{
				Validate(themeConfig,{
					theme : 'required'
				})
				console.log(themeConfig)
				let config = await UserConfig.findOne()
		
				config.theme = themeConfig.theme
				config.save()
		
				event.reply('updateUserConfigResponse', Response(true,'Theme saved'))
			}catch(error){
				event.reply('updateUserConfigResponse', Response(false,error.message))
			}
		})
	}
}

Object.values(events).forEach(event=>event())