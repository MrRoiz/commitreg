const { ipcMain } = require('electron')
const Response = require('../Utils/Response')
const FeatureFlag = require('../../models/featureflag')

const events = {
	index(){
		ipcMain.on('indexFeatureFlag',async (event)=>{
			try{
				let featureFlags = await FeatureFlag.findAll()
				event.reply('indexFeatureFlagResponse',Response(true,featureFlags.map(featureFlag=>featureFlag.toJSON())))
			}catch(error){
				event.reply('indexFeatureFlagResponse',Response(false,error.message))
			}
		})
	},
	store(){},
	update(){},
	destroy(){}
}

Object.values(events).forEach(event=>event())