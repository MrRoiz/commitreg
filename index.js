(async ()=>{
	const { app, BrowserWindow } = require('electron')
	require('./app/Events/index')

	function createWindow () {
		const win = new BrowserWindow({
			width: 1000,
			height: 700,
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