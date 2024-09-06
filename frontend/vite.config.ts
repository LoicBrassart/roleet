import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import type { UserConfig } from "vitest/config";

// https://vitejs.dev/config/
const config: UserConfig = {
  plugins: [react()],
  server: {
    host: true,
    watch: {
      usePolling: true,
    },
    hmr: {
      port: 8000,
    },
  },
  build: {
    outDir: "./build",
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
};
export default defineConfig(config);
