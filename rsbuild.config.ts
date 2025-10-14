import { defineConfig } from '@rsbuild/core'

export default defineConfig({
  source: {
    entry: {
      main: './src/index.tsx',
    },
  },
  output: {
    distPath: {
      root: 'rsbuild',
    },
    target: 'node',
    charset: 'utf8',
    cleanDistPath: true,
  },
  mode: 'production',
})
