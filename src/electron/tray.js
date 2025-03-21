import { Menu, Tray, app } from 'electron';
import { getAssetsPath } from './pathResolver.js';
import path from 'path';
import process from 'process';

export function createTray(mainWindow) {
  
  const tray = new Tray(
    path.join(
      getAssetsPath(),
      process.platform === 'darwin' ? 'trayIcon.icns' : 'trayIcon.ico'
    )
  );

  tray.setContextMenu(
    Menu.buildFromTemplate([
      {
        label: 'Show',
        click: () => {
          mainWindow.show();
          if (app.dock) {
            app.dock.show();
          }
        },
      },
      {
        label: 'Quit',
        click: () => app.quit(),
      },
    ])
  );
}