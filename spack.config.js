const { config } = require("@swc/core/spack");

module.exports = config({
  entry: {
    index: __dirname + "/tsc/index.js",
  },
  output: {
    path: __dirname + "/spack",
  },
});