import { Tray} from "electron";
import process from "process";
import path from "path";
import { getAssetsPath } from "./pathResolver.js";

export function createTray(mainWindow) {
  const iconPath = path.join(
    getAssetsPath(),
    process.platform === "darwin" ? "trayIcon.icns" : "trayIcon.ico"
  );
  console.log("Tray icon path:", iconPath); // Add this line for debugging
  new Tray(iconPath);
  console.log("Tray created");
} 

