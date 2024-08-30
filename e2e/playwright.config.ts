import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: "./tests",

  timeout: 30 * 1000 /* maxTime per test, in ms. */,
  expect: {
    timeout: 5000 /* maxTime per expect(), in ms. */,
  },
  fullyParallel: true /* Run tests in files in parallel */,
  forbidOnly:
    !!process.env.CI /* Fail CI if you use test.only in the source code. */,
  retries: process.env.CI ? 2 : 0 /* Retry on CI only */,
  workers: process.env.CI
    ? 1
    : undefined /* Opt out of parallel tests on CI. */,
  reporter: [["html", { open: "never" }], ["list"]],
  use: {
    actionTimeout: 0 /* maxTime per atcion (ie. click()), in ms (0=no limit). */,
    // baseURL: 'http://localhost:3000', /* Prefix for actions like `await page.goto('/')`. */
    trace: "on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: {
    //     ...devices['Pixel 5'],
    //   },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: {
    //     ...devices['iPhone 12'],
    //   },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     channel: 'msedge',
    //   },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: {
    //     channel: 'chrome',
    //   },
    // },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',
};

export default config;
