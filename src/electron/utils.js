// Desc: Utils for electron app
import process from "process";

console.log("Utils is running");
export function isDev() {

    return process.env.NODE_ENV === "development";
}