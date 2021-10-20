// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu } = require('electron')
const path = require('path')

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 200,
    height: 200,
    frame: false,
    resizable: false,
    alwaysOnTop: true,
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })


  function resize(size = 100) {
    mainWindow.setSize(size, size, true)
  }

  mainWindow.loadFile('index.html');

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // setup menu
  const name = app.getName();
  menu = Menu.buildFromTemplate([
    {
      label: name,
      submenu: [
        {
          label: 'About ' + name,
          role: 'about'
        },
        {
          type: 'separator'
        },
        {
          label: 'Hide Others',
          accelerator: 'Command+Shift+H',
          role: 'hideothers'
        },
        {
          label: 'Show Others',
          role: 'unhide'
        },
        {
          type: 'separator'
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: () => { app.quit(); }
        },
      ]
    },
    {
      label: 'File',
      submenu: [
        { label: 'Reload', role: 'reload' },
        { label: 'Force Reload', role: 'forceReload' },
        { label: 'Close', role: 'close' },
      ]
    },
    {
      label: 'Windows',
      submenu: [
        { label: 'Small', accelerator: 'Command+1', click: () => { resize(100) } },
        { label: 'Medium', accelerator: 'Command+2', click: () => { resize(200) } },
        { label: 'Big', accelerator: 'Command+3', role: '', click: () => { resize(300) } },
        { label: 'Full Screen', role: 'togglefullscreen' },
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
