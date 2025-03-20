import { Tray } from "electron";
import path from "path";
import { getAssetsPath } from "./pathResolver.js";
import process from "process";

export function createTray(mainWindow) {
  try {
    const iconPath = path.join(
      getAssetsPath(),
      process.platform === "darwin" ? "trayIcon.icns" : "trayIcon.ico"
    );
    console.log("Tray icon path:", iconPath); // Debugging

    const tray = new Tray(iconPath);
    tray.setToolTip("Deski App"); // Add a tooltip
    console.log("Tray created successfully:", tray); // Debugging

    // Optional: Add a click event to show/hide the main window
    tray.on("click", () => {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    });
  } catch (error) {
    console.error("Error creating tray:", error); // Debugging
  }
}