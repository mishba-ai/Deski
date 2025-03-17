const { contextBridge, ipcRenderer } = require("electron");

// Safely exposes APIs to the renderer process and  Only the specified methods are exposed, maintaining isolation
contextBridge.exposeInMainWorld("electron", {
  //Allows the UI to receive system statistics updates
  //for displaying real-time CPU/RAM/storage information
  subscribeStatistics: (callback) => {
    // Desc: Subscribe to statistics updates
    const subscription = (_, statistics) => callback(statistics);
    ipcRenderer.on("statistics", subscription);

    //Returns an unsubscribe function to clean up the listener when no longer needed
    return () => ipcRenderer.off("statistics", subscription);
  },

  //Retrieves system hardware information
  //For displaying static information like CPU model or total memory
  getStaticData: () => ipcRenderer.invoke("getStaticData"),

  //Allows the UI to be notified when the view should change
  //For switching between different displays (CPU, RAM, STORAGE)
  subscribeChangeView: (callback) => {
    //Similar to statistics subscription, but for view change events
    const subscription = (_, view) => callback(view);
    ipcRenderer.on("changeView", subscription);
    return () => ipcRenderer.off("changeView", subscription);
  },

  //Sends window control commands to the main process
  //For window controls like minimize, maximize, or close
  sendFrameAction: (payload) => ipcRenderer.send("frameAction", payload), //Sends a one-way message with the action to perform
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