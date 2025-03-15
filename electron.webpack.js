import path from "path";
import { fileURLToPath } from "url";
import process from "process";

// Convert the module URL to a file path (required for `__dirname` in ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  // Set the mode (development or production)
  mode: process.env.NODE_ENV === "production" ? "production" : "development",
  // Entry point for the Electron main process
  entry: {
    main: "./src/electron/main.js",
    preload: "./src/electron/preload.cjs",
  }, 
  // Output configuration
  output: {
    path: path.resolve(__dirname, "dist-electron"), // Output directory
    filename: "[name].cjs", // Output file name
  },
  // Target environment (Electron main process)
  target: "electron-main",
  // Enable file watching in development mode
  watch: process.env.NODE_ENV === "development",
  // Module rules (for handling different file types)
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/, // Don't process node_modules
        use: {
          loader: "babel-loader", // Use Babel for transpiling
          options: {
            presets: ["@babel/preset-env"], // Use @babel/preset-env for modern JS
          },
        },
      },
    ],
  },
  // Resolve file extensions
  resolve: {
    extensions: [".js", ".json","cjs"], // Add '.ts' if using TypeScript
  },
  // Development tools (source maps, etc.)
  devtool: "inline-source-map",
};
