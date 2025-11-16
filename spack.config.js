const { config } = require("@swc/core/spack");

module.exports = config({
  entry: {
    index: __dirname + "/src/index.tsx",
  },
  output: {
    path: __dirname + "/lib",
  },
});