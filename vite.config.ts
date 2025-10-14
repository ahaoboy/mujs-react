import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  build: {
    outDir: 'vite',
    target: 'es2015',
    rollupOptions: {
      input: {
        "main": './src/index.tsx',
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
  plugins: [
    legacy({
      targets: ['defaults', 'IE 11'],
      // additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      // modernPolyfills: true,
      // polyfills: false,
      // renderLegacyChunks: false,
    }),
  ],
  define: {
    globalThis: {
      version: JSON.stringify('0.1.14'),
    },
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  esbuild: {
    charset: 'utf8',
    target: "es2015"
  },
})
