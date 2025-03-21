// @ts-check
import { test, expect, _electron } from "@playwright/test";

let electronApp;
let mainPage;

async function waitForPreloadScript() {
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      // Using try/catch since the evaluation might fail before electron is available
        const electronBridge = await mainPage.evaluate(() => {
          return window.electron;
        });
        
        if (electronBridge) {
          clearInterval(interval);
          resolve(true);
        }
    }, 100);
  });
}

test.beforeEach(async () => {
  electronApp = await _electron.launch({
    args: ["."],
    env: { NODE_ENV: "development" },
  });
  mainPage = await electronApp.firstWindow();
  await waitForPreloadScript();
});

test.afterEach(async () => {
  await electronApp.close();
});

test("custome frame should minimize the mainwindow", async () => {
  await mainPage.click("#minimize");
  const isMinimized = await electronApp.evaluate((electron) => {
    return electron.BrowserWindow.getAllWindows()[0].isMinimized();
  });
  expect(isMinimized).toBeTruthy();
});

test("should create a custom menu", async () => {
  const menu = await electronApp.evaluate((electron) => {
    return electron.Menu.getApplicationMenu();
  });
  expect(menu).not.toBeNull();
  expect(menu?.items).toHaveLength(1);
  expect(menu?.items[0].submenu?.items).toHaveLength(3);
  expect(menu?.items[0].label).toBe("App");
});
