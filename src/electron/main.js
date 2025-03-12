import { app, BrowserWindow } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { pollResources } from "./resourcemanager.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    icon: path.join(app.getAppPath(), "/dist-react/favicon.png"),
    webPreferences: {
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
