module.exports = {
  "preset": "ts-jest/presets/js-with-ts",
  "testEnvironment": "jest-environment-node",  
  "moduleFileExtensions": ['js', 'jsx', 'ts', 'tsx', 'json', 'node',"d.ts"],
  "verbose": true,
  "collectCoverage":true,
  "collectCoverageFrom": [
    "./src/**/*.{js,ts}",
    "!**/*types.ts",
    "!**/node_modules/**",
    "!./src/index.ts"
  ],
  "coverageThreshold": {
    "global": {
      "branches": 80,
      "functions": 80,
      "lines": 80,
      "statements": 80
    }
  }
};