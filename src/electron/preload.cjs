const { contextBridge, ipcRenderer } = require("electron");

// Safely exposes APIs to the renderer process and  Only the specified methods are exposed, maintaining isolation
contextBridge.exposeInMainWorld("electron", {
  //Allows the UI to receive system statistics updates
  //for displaying real-time CPU/RAM/storage information
  subscribeStatistics: (callback) =>
    ipcOn("statistics", (stats) => {
      callback(stats);
    }),

  //Allows the UI to be notified when the view should change
  //For switching between different displays (CPU, RAM, STORAGE)
  subscribeChangeView: (callback) => {
    //Similar to statistics subscription, but for view change events
    ipcOn("statistics", (stats) => {
      callback(stats);
    });
  },
  //Retrieves system hardware information
  //For displaying static information like CPU model or total memory
  getStaticData: () => ipcInvoke("getStaticData"),

  //Sends window control commands to the main process
  //For window controls like minimize, maximize, or close
  sendFrameAction: (payload) => ipcSend("sendFrameAction", payload), //Sends a one-way message with the action to perform
});

function ipcInvoke(key) {
  return ipcRenderer.invoke(key);
}

function ipcOn(key, callback) {
  const cb = (_, payload) => callback(payload);
  ipcRenderer.on(key, cb);
  return () => ipcRenderer.off(key, cb);
}

function ipcSend(key, payload) {
  ipcRenderer.send(key, payload);
}
