// preload.cjs
// This script is loaded in the renderer process before other scripts.

const { contextBridge, ipcRenderer } = require('electron');

// For debugging
console.log("Preload script is running");

contextBridge.exposeInMainWorld('electron', {
  subscribeStatistics: (callback) => {
    ipcRenderer.on('statistics', (_, stats) => {
      callback(stats);
    });
  },
  getStaticData: () => ipcRenderer.invoke('getStaticData')
});