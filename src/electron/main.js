import { app, BrowserWindow, ipcMain } from "electron";

import { isDev } from "./utils.js";
import { getStaticData, pollResources } from "./resourcemanager.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";
import { createTray } from "./tray.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(getUIPath());
  }

  pollResources(mainWindow);
  //on or send are for more UDP type of communication
  ipcMain.handle("getStaticData", () => {
    return getStaticData();
  });

  createTray(mainWindow)
  handleCloseEvents(mainWindow);
});

function handleCloseEvents(mainWindow) {
  let willClose = false;

  mainWindow.on("close", (e) => {
    if (willClose) {
      return;
    }
    e.preventDefault();
    mainWindow.hide();
    if (app.dock) {
      app.dock.hide();
    }
  });

  app.on("before-quit", () => {
    willClose = true;
  });

  mainWindow.on("show", () => {
    willClose = false;
  });
}
