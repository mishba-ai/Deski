// Desc: Utils for electron app
import process from "process";

export function isDev() {
    return process.env.NODE_ENV === "development";
}