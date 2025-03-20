import osUtils from "os-utils";
import fs from "fs";
import os from "os";
import process from "process";
import { ipcWebContentsSend } from "./utils.js";

const POLLING_INTERVAL = 500;

// Polls the resources for changes and sends stats to the renderer process
export function pollResources(mainWindow) {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const storageData = getStorageData();

    const stats = {
      cpuUsage: cpuUsage,
      ramUsage: ramUsage,
      storageUsage: storageData.usage,
    };

    // console.log("Sending stats:", stats); // Debug in main process
    ipcWebContentsSend("statistics", mainWindow.webContents, stats);
  }, POLLING_INTERVAL);

}

// Retrieves static system information
export function getStaticData() {
  try {
    const totalStorage = getStorageData().total;
    const cpuModel = os.cpus()[0].model; // Fixed typo
    const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

    return {
      totalStorage,
      cpuModel,
      totalMemoryGB,
    };
  } catch (error) {
    // console.error("Error getting static data:", error);
    return {
      totalStorage: 0,
      cpuModel: "Unknown",
      totalMemoryGB: 0,
    };
  }
}

// Retrieves CPU usage as a percentage
function getCpuUsage() {
  return new Promise((resolve, reject) => {
    osUtils.cpuUsage((usage) => {
      if (usage === undefined || isNaN(usage)) {
        reject(new Error("Failed to get CPU usage"));
      } else {
        resolve(usage);
      }
    });
  });
}

// Calculates RAM usage as a percentage
function getRamUsage() {
  try {
    return 1 - osUtils.freememPercentage();
  } catch (error) {
    // console.error("Error getting RAM usage:", error);
    return 0; // Return a default value in case of error
  }
}

// Retrieves storage usage for the root directory
function getStorageData() {
  try {
    const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
    const total = stats.bsize * stats.blocks; // Total storage in bytes
    const free = stats.bsize * stats.bfree; // Free storage in bytes

    return {
      total: Math.floor(total / 1_000_000_000), // Convert bytes to GB
      usage: 1 - free / total, // Calculate usage percentage
    };
  } catch (error) {
    // console.error("Error getting storage data:", error);
    return {
      total: 0,
      usage: 0,
    };
  }
}
