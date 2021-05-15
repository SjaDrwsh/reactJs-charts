"use strict";

module.exports = {
  rootDir: "..",
  moduleDirectories: ["node_modules", ".."],
  restoreMocks: true,
  // Coverage
  coverageDirectory: "artifacts/coverage",
  collectCoverage: false,
  collectCoverageFrom: ["**/*.ts?(x)"],
  reporters: [
    "default",
    [
      "./node_modules/jest-html-reporter",
      {
        outputPath: "artifacts/test/test-report.html",
      },
    ],
  ],
  coverageReporters: ["text", "lcov", "text-summary", "json-summary"],
  coveragePathIgnorePatterns: [
    "<rootDir>/bin/",
    "<rootDir>/coverage/",
    "<rootDir>/config/",
    "<rootDir>/src/type",
    "<rootDir>/node_modules/",
    "<rootDir>/public/",
  ],
  // Fixes console statements not appearing in watch mode
  // https://github.com/facebook/jest/issues/2441
  verbose: false,
  setupFiles: [
    "<rootDir>/config/polyfills.js",
    "jest-localstorage-mock",
    "<rootDir>/config/jest/enzymeAdapter.js",
    "<rootDir>/config/jest/globalSetup.js",
  ],
  setupFilesAfterEnv: ["<rootDir>/config/jest/jestSetup.ts"],
  testMatch: ["**/*.test.ts?(x)"],
  testEnvironment: "<rootDir>/config/jest/testEnvironment.js",
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  testURL: "http://localhost/#/",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};

module.exports = {
  setupTestFrameworkScriptFile: "<rootDir>/src/setupTests.ts",
  testEnvironment: "node",
  testMatch: [
    "**/**/*.test.ts?(x)",
    "**/**/*.test.js?(x)",
    "**/?(*.)+(spec|test).js?(x)",
  ],
  modulePaths: ["<rootDir>/src", "<rootDir>/node_modules"],
  globals: {
    NODE_ENV: "test",
  },
  verbose: true,
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  transform: {
    "^.+\\.tsx?$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
  },
  transformIgnorePatterns: ["/node_modules/(?!(lodash-es|react)/)"], // <-- this allows babel to load only the node modules I need (which is lodash-es) and ignore the rest
  moduleNameMapper: {
    "aurelia-(.*)": "<rootDir>/node_modules/$1",
  },
  // some coverage and results processing options
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components/**/*.ts?(x)",
    "src/components/**/*.js?(x)",
    "src/reducers/**/*.ts?(x)",
    "src/reducers/**/*.js?(x)",
  ],
  coverageDirectory: "./coverage",
  coverageReporters: ["json", "lcov", "text"],
};
