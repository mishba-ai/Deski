import { Menu, app } from "electron";
import process from "process";
import { ipcWebContentsSend, isDev } from "./utils.js";

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
            visible: isDev(),
          },
          {
            label: "View",
            type: "submenu",
            submenu: [
              {
                label: "CPU",
                click:() => ipcWebContentsSend(
                  "changeView",
                  mainWindow.webContents,
                  "CPU"
                ),
              },
              {
                label: "RAM",
                click: ()=> ipcWebContentsSend(
                  "changeView",
                  mainWindow.webContents,
                  "RAM"
                ),
              },
              {
                label: "STROAGE",
                click:()=> ipcWebContentsSend(
                  "changeView",
                  mainWindow.webContents,
                  "STORAGE"
                ),
              },
            ],
          },
        ],
      },
    ])
  );
}
