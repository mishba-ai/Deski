import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { pollResources } from "./resourcemanager.js";
import { getPreloadPath } from "./pathResolver.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    icon: path.join(app.getAppPath(), "/dist-react/favicon.png"),
    webPreferences: {
      width: 800,
      height: 600,
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  pollResources();
});
