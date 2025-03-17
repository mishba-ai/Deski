import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { getStaticData, pollResources } from "./resourcemanager.js";
import { getPreloadPath ,getUIPath} from "./pathResolver.js";

console.log("Preload script path:", getPreloadPath());

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
      
    },
    icon: path.join(getUIPath()),
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  pollResources(mainWindow);
  //on or send are for more UDP type of communication
  ipcMain.handle("getStaticData", () => {
    return getStaticData();
  });
});
