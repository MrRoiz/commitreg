const { ipcMain } = require('electron')
const Response = require('../Utils/Response')
const Validate = require('../Utils/Validate')
const Repository = require('../Models/Repository')

const events = {
	index(){
		ipcMain.on('indexRepository',async (event)=>{
			try{
				let repositories = await Repository.findAll()
				event.reply('indexRepositoryResponse',Response(true,repositories.map(repository=>repository.toJSON())))
			}catch(error){
				event.reply('indexRepositoryResponse',Response(false,error.message))
			}
		})
	},
	store(){
		ipcMain.on('storeRepository',async (event,repository)=>{
			try{
				Validate(repository,{
					name : 'required'
				})

				let newRepository = await Repository.create({
					name       : repository.name,
					description: repository.description
				})

				event.reply('storeRepositoryResponse',Response(true,newRepository.toJSON()))
			}catch(error){
				event.reply('storeRepositoryResponse',Response(false,error.message))
			}
		})
	},
}

Object.values(events).forEach(event=>event())