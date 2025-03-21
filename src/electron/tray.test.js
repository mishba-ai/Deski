import { expect, test, vi } from "vitest";
import { createTray } from "./tray";
import { Menu, app } from "electron";

vi.mock("electron", () => {
  return {
    Tray: vi.fn().mockReturnValue({
      setContextMenu: vi.fn(),
    }),
    app: {
      getAppPath: vi.fn().mockReturnValue("/"),
      dock: {
        show: vi.fn(),
      },
      quit: vi.fn(),
    },
    Menu: {
      buildFromTemplate: vi.fn(),
    },
  };
});

const mainWindow = {
  show: vi.fn(),
};

test("", () => {
  createTray(mainWindow);
  const calls = Menu.buildFromTemplate.mock.calls;
  const args = calls[0];
  const template = args[0];
  expect(template).toHaveLength(2);

  expect(template[0].label).toEqual("Show");
  template[0]?.click?.(null, null, null);
  expect(mainWindow.show).toHaveBeenCalled();
  expect(app.dock.show).toHaveBeenCalled();

  template[1]?.click?.(null, null, null);
  expect(app.quit).toHaveBeenCalled();
});
