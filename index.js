(async ()=>{
	
	const InitSchema = require('./db/initSchema')
	const { app, BrowserWindow } = require('electron')
	require('./app/Events/index')
	
	await (new InitSchema()).migrate()

	function createWindow () {
		const win = new BrowserWindow({
			width: 800,
			height: 600,
			webPreferences : {
				nodeIntegration : true,
				contextIsolation: false
			}
		})
	
		win.setMenuBarVisibility(false)
		
		win.loadFile('dist/index.html')
	}
	
	await app.whenReady()
	createWindow()

})()