const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  printReceipt: (text) => ipcRenderer.invoke('print-receipt', text)
})
