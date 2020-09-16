module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setupJest.ts"],
  moduleFileExtensions: ['js', 'ts'],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/dist/"],
  testMatch: ["**/+(*.)+(spec).+(ts)"],
  collectCoverage: true,
  coverageReporters: ["html"],
  roots: ["<rootDir>/src"],
  coverageDirectory: "coverage/",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  globals: {
    "ts-jest": {
      tsConfig: "<rootDir>/tsconfig.spec.json",
      stringifyContentPathRegex: "\\.html$",
      diagnostics: {
        ignoreCodes: [151001],
      },
    },
  },
};
