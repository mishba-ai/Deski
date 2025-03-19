import { Tray} from "electron";
import process from "process";
import path from "path";
import { getAssetsPath } from "./pathResolver.js";

export function createTray(mainWindow){
    new Tray(
        path.join(
          getAssetsPath(),
          process.platform === "darwin" ?  "trayIconTemplate.png":"trayIcon.ico" 
        )
      );
}