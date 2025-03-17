// Desc: Utils for electron app
import { ipcMain } from "electron";
import process from "process";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";

export function isDev() {
  return process.env.NODE_ENV === "development";
}

//Sets up a secure request-response channel between renderer and main processes
// For operations where the renderer needs to get data from the main process
export function ipcMainHandle(key, handler) {
  //Registers a handler for a specific channel (key)
  ipcMain.handle(key, (event) => {
    // Validates the request source for security

    validateEventFrame(event.senderFrame);
    return handler();
  });
}

//Sets up a one-way message channel from renderer to main process
// For sending commands or data from the UI to the main process
export function ipcMainOn(key, handler) {
  // Listens for messages on a specific channel (key)

  ipcMain.on(key, (event, payload) => {
    //Validates the message source for security

    validateEventFrame(event.senderFrame);
    return handler(payload);
  });
}

// Sends messages from the main process to a specific renderer window
// For pushing updates from the main process to the UI
export function ipcWebContentsSend(key, webContents, payload) {
  //  Uses the renderer's webContents object to send a message with payload data
  webContents.send(key, payload);
}

//Security function to prevent unauthorized IPC communication
export function validateEventFrame(frame) {
  console.log(frame.url);
  if (isDev() && new URL(frame.url).host === "localhost:5123") {
    return;
  }
  if (frame.url !== pathToFileURL(getUIPath()).toString()) {
    throw new Error("Invalid event frame");
  }
}
