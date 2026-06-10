const { app, BrowserWindow, ipcMain } = require('electron')
const path   = require('path')
const fs     = require('fs')
const os     = require('os')
const { exec } = require('child_process')

function createWindow() {
  const win = new BrowserWindow({
    width: 1280, height: 800, minWidth: 960, minHeight: 640,
    title: 'Mady', autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile(path.join(__dirname, 'dist/index.html'))
}

// Save receipt to temp .txt and open with Notepad
ipcMain.handle('print-receipt', async (event, text) => {
  try {
    const tmpFile = path.join(os.tmpdir(), 'mady-receipt.txt')
    // Write with UTF-8 BOM so Notepad shows Bangla chars correctly
    const bom = '\uFEFF'
    fs.writeFileSync(tmpFile, bom + text, 'utf8')
    // Open Notepad with the file
    exec(`notepad.exe "${tmpFile}"`)
    return { success: true }
  } catch (e) {
    return { success: false, error: e.message }
  }
})

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
