import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  base: "./",
  build: {
    outDir: "dist-react",
    assetsDir: "assets",
  },
  server: {
    port: 5123,
    strictPort: true,
  },
});
