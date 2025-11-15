import babel from 'esbuild-plugin-babel';
import { build } from "esbuild"
import fs from "node:fs"
import { ES5BabelPlugin } from './ES5BabelPlugin'

build({
  entryPoints: ["./tsc/*"],
  bundle: true,
  outdir: "esbuild-tsc",
  minify: true,
  loader: {
    ".glsl": "text",
    ".png": "base64",
  },
  charset: "utf8",
  define: {
    "globalThis.version": '"0.1.15-alpha.17"',
    "process.env.NODE_ENV": '"production"',
  },
  // metafile: true,
  format: "esm",
  plugins: [
    ES5BabelPlugin()
  ]
})
  .then((r) => {
    fs.writeFileSync("./esbuild-tsc/metafile.json", JSON.stringify(r.metafile))
  })
  .catch(() => process.exit(1))
