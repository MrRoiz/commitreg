const { ipcMain } = require('electron')
const Response = require('../Utils/Response')
const Validate = require('../Utils/Validate')
const Module = require('../../database/models/module')

const events = {
	index(){
		ipcMain.on('indexModule',async (event)=>{
			try{
				let modules = await Module.findAll()
				event.reply('indexModuleResponse',Response(true,modules.map(repository=>repository.toJSON())))
			}catch(error){
				event.reply('indexModuleResponse',Response(false,error.message))
			}
		})
	},
	store(){
		ipcMain.on('storeModule',async (event,module)=>{
			try{
				Validate(module,{
					name : 'required',
					idRepository : 'required'
				})

				let newModule = await Module.create({
					name       : module.name,
					description: module.description,
					repository_id : module.idRepository
				})

				event.reply('storeModuleResponse',Response(true,newModule.toJSON()))
			}catch(error){
				event.reply('storeModuleResponse',Response(false,error.message))
			}
		})
	},
	update(){
		ipcMain.on('updateModule',async (event,module)=>{
			try{
				Validate(module,{
					id   : 'required',
					name : 'required'
				})
				
				let [responseUpdate] = await Module.update({
					name : module.name,
					description : module.description
				},{
					where : {
						id : module.id
					}
				})

				if(responseUpdate != 1) throw new Error('It was not possible to update the Module')

				event.reply('updateModuleResponse',Response(true,module))
			}catch(error){
				event.reply('updateModuleResponse',Response(false,error.message))
			}
		})
	},
	destroy(){
		ipcMain.on('destroyModule',async (event,module)=>{
			try{
				Validate(module,{
					id : 'required'
				})

				await Module.destroy({
					where : {
						id : module.id
					}
				})

				event.reply('destroyModuleResponse',Response(true,'Module Deleted'))
			}catch(error){
				event.reply('destroyModuleResponse',Response(false,error.message))
			}
		})
	}
}

Object.values(events).forEach(event=>event())