import path from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import type { ViteUserConfig } from "vitest/config";

// https://vitejs.dev/config/
const config: ViteUserConfig = {
  plugins: [react()],
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
    hmr: {
      port: 7000,
      path: "/hmr",
    },
  },
  build: {
    outDir: "./build",
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};
export default defineConfig(config);
