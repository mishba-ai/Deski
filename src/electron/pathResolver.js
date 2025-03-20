import path from "path";
import { app } from "electron";
import { isDev } from "./utils.js";
// import process from "process";


export function getPreloadPath() {
  return path.join(
    app.getAppPath(),
    isDev() ? "." : "..",
    "/dist-electron/preload.cjs"
  );
}

export function getUIPath() {
  return path.join(app.getAppPath(), "/dist-react/index.html");
}

export function getAssetsPath() {
  // if (isDev()) {
  //   return path.join(app.getAppPath(),isDev() ? '.' : '..', "/src/assets");
  // } else {
  //   // In production, resources are in the extraResources folder
  //   return path.join(process.resourcesPath, "assets");
  // }
  return path.join(app.getAppPath(), isDev() ? '.' : '..', '/src/assets');

}
