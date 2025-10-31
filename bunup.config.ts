import { defineConfig } from "bunup";

export default defineConfig({
  noExternal: ['react', "@mpv-easy/polyfill", "react-dom/server", "react-dom", "buffer"],
  target: "browser",
  format: "cjs",
  outDir: "bunup"
});