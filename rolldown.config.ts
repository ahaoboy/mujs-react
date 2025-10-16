import { defineConfig } from 'rolldown';
import babel from '@rollup/plugin-babel'

export default defineConfig(
  {
    input: 'src/index.tsx',
    transform: {
      'target': "es2015"
    },
    output: {
      dir: "rolldown",
      format: "iife",
      minify: true,
      generatedCode: {
        'preset': 'es5'
      }
    },
    plugins: [
      // babel({
      //   babelHelpers: 'bundled',
      //   extensions: ['.js', '.ts', '.tsx']
      // }),
      babel({
        babelHelpers: 'bundled',
        presets: [
          [
            '@babel/preset-env',
            {
              targets: '> 0.25%, not dead, ie 11',
              useBuiltIns: false,
            },
          ],
        ],
        extensions: ['.js', '.ts', '.tsx'],
        generatorOpts: {
          jsescOption: {
            minimal: true,
          },
        },
      }),
    ],
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
  });