const { contextBridge, ipcRenderer } = require('electron');

// For debugging
console.log("Preload script is running");
console.log("hi")
contextBridge.exposeInMainWorld('electron', {
  subscribeStatistics: (callback) => {
    ipcRenderer.on('statistics', (_, stats) => {
      callback(stats);
    });
  },
  getStaticData: () => ipcRenderer.invoke('getStaticData')
});