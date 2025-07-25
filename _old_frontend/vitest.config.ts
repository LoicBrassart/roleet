import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "__unit-tests__/**/*.test.ts",
      "__integration-tests__/**/*.test.ts",
    ],
  },
});
