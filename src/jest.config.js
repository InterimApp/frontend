// jest.config.js
module.exports = {
    transformIgnorePatterns: [
      "/node_modules/(?!(axios)/)" // Allow transforming axios
    ],
    testEnvironment: "jsdom",
  };
  