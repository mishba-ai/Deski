import { Menu, app } from "electron";
import process from "process";

export function createMenu(mainWindow) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: process.platform === "darwin" ? undefined : "App",
        type: "submenu",
        submenu: [
          {
            label: "Quit",
            click: app.quit,
          },
          {
            label: "DevTools",
            click: () => mainWindow.webContents.openDevTools(),
          },
          {
            label: "View",
            type: "submenu",
            submenu: [{ label: "CPU" }, { label: "RAM" }, { label: "Network" }],
          },
        ],
      },
    ])
  );
}
