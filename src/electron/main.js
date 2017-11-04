const electron = require('electron')
const {app, BrowserWindow, Menu} = electron

const path = require('path')
const url = require('url')
// menu
const template = require(path.join(__dirname, 'backend/views/layout/navigation'))

let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1200, 
    height: 900,
    title: "My Project Name",
    icon: path.join(__dirname, 'dist/images/icons/mac/icon.icns')

  })

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools.
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', function(){
  createWindow()
  const menu = Menu.buildFromTemplate(template.template) // because recieve { template: [..] }
  Menu.setApplicationMenu(menu) // Sets menu as the application menu on macOS. On Windows and Linux, the menu will be set as each window’s top menu.

})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
