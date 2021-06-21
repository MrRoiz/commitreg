const { app, BrowserWindow } = require('electron')
const db = require('./src/db/index')

function createWindow () {
	const win = new BrowserWindow({
		width: 800,
		height: 600
	})

	win.setMenuBarVisibility(false)
	
	win.loadFile('dist/index.html')
}

app.whenReady().then(() => {
	createWindow()
})