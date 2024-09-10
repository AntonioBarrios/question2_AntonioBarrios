module.exports = {
  clearMocks: true,
  verbose: false,
  setupFilesAfterEnv: ['regenerator-runtime/runtime'],
  testPathIgnorePatterns: [
    "/node_modules/",
  ],
  useStderr: false,
  testTimeout: 1000000,
  reporters: [
    "default",
    ["jest-summary-reporter", {"failuresOnly": false}]
  ]
}
