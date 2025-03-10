/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["**/_tests/**/*.test.ts"],
  globals: {
    "ts-jest": {
      isolatedModules: true, // Utile si tu veux éviter que TypeORM lance des connexions DB
    },
  },
};
