import { defineConfig } from "@farmfe/core";

export default defineConfig({
  root: process.cwd(), // compiled root directory
  // compile options
  compilation: {
    // presetEnv: {
    // "options": ""
    // },
    input: {
      index: "./src/index.tsx",
    },
    external: ["buffer", "url"],
    // external: ["^buffer$", "^url$"],
    // externalNodeBuiltins: ["^buffer$", "^url$"],
    minify: false,
    mode: "production",
    output: {
      path: 'farm',
      targetEnv: "browser-legacy",
      // targetEnv: "node-legacy",
      // filename: "index"
    },
  },
  plugins: [],
});