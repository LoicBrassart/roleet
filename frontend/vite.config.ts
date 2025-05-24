import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import type { ViteUserConfig } from "vitest/config";

// https://vitejs.dev/config/
const config: ViteUserConfig = {
  plugins: [react(), tailwindcss()],
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
    hmr: {
      port: 7000,
      path: "/hmr",
    },
    allowedHosts: ["frontend-dev"],
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
