//will be using os-utils for cpu and ram usage
import osUtils from "os-utils";
import fs from "fs";
import process from "process";

const POLLING_INTERVAL = 500; //

// Polls the resources for changes and updates the resources in the database

export function pollResources() {
  setInterval(async () => {
    const cpuUsage = await getCpuUsage();
    const ramUsage = getRamUsage();
    const storageData = getStorageData();
    console.log({ cpuUsage, ramUsage, storageUsage: storageData.usage });
  }, POLLING_INTERVAL);
}

export function getStaticData(){
    const totalStorage = getStorageData().total;
}

function getCpuUsage() {
  return new Promise((resolve) => {
    osUtils.cpuUsage(resolve);
  });
}

function getRamUsage() {
  return 1 - osUtils.freememPercentage();
}

function getStorageData() {
  const stats = fs.statfsSync(process.platform === "win32" ? "C:" : "/"); // get the stats of the root directory
  const total = stats.bsize * stats.blocks; // total storage in bytes
  const free = stats.bsize * stats.bfree; // free storage in bytes

  return {
    total: Math.floor(total / 1_000_000_000), // convert bytes to GB
    usage: 1 - free / total, // calculate the usage percentage
  };
}
