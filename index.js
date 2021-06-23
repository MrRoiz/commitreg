(async ()=>{
	
	const InitSchema = require('./db/initSchema')
	const { app, BrowserWindow } = require('electron')

	await (new InitSchema()).migrate()
	
	function createWindow () {
		const win = new BrowserWindow({
			width: 800,
			height: 600
		})
	
		win.setMenuBarVisibility(false)
		
		win.loadFile('dist/index.html')
	}
	
	await app.whenReady()
	createWindow()

})()