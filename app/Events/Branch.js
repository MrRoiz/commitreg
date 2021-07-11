const { ipcMain } = require('electron')
const Response = require('../Utils/Response')
const Validate = require('../Utils/Validate')
const Branch = require('../Models/Branch')

const events = {
	index(){
		ipcMain.on('indexBranch',async (event)=>{
			try{
				let branches = await Branch.findAll()
				event.reply('indexBranchResponse',Response(true,branches.map(repository=>repository.toJSON())))
			}catch(error){
				event.reply('indexBranchResponse',Response(false,error.message))
			}
		})
	},
	store(){
		ipcMain.on('storeBranch',async (event,branch)=>{
			try{
				Validate(branch,{
					name : 'required',
					idRepository : 'required'
				})

				let newBranch = await Branch.create({
					name       : branch.name,
					description: branch.description,
					id_repository : branch.idRepository
				})

				event.reply('storeBranchResponse',Response(true,newBranch.toJSON()))
			}catch(error){
				event.reply('storeBranchResponse',Response(false,error.message))
			}
		})
	},
	update(){
		ipcMain.on('updateBranch',async (event,branch)=>{
			try{
				Validate(branch,{
					id   : 'required',
					name : 'required'
				})
				
				let [responseUpdate] = await Branch.update({
					name : branch.name,
					description : branch.description
				},{
					where : {
						id : branch.id
					}
				})

				if(responseUpdate != 1) throw new Error('It was not possible to update the Branch')

				event.reply('updateBranchResponse',Response(true,branch))
			}catch(error){
				event.reply('updateBranchResponse',Response(false,error.message))
			}
		})
	},
	destroy(){
		ipcMain.on('destroyBranch',async (event,branch)=>{
			try{
				Validate(branch,{
					id : 'required'
				})

				await Branch.destroy({
					where : {
						id : branch.id
					}
				})

				event.reply('destroyBranchResponse',Response(true,'Branch Deleted'))
			}catch(error){
				event.reply('destroyBranchResponse',Response(false,error.message))
			}
		})
	}
}

Object.values(events).forEach(event=>event())