/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node", // descomente se precisar
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
};

module.exports = config;
