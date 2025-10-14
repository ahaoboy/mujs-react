import typescript from '@rollup/plugin-typescript'
import replace from '@rollup/plugin-replace'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { defineConfig } from 'rollup'
import babel from '@rollup/plugin-babel'
// import nodePolyfills from 'rollup-plugin-node-polyfills'
import alias from '@rollup/plugin-alias'
import path from 'path'

export default defineConfig({
  input: [
    'src/index.tsx',
  ],
  output: {
    dir: 'rollup',
    format: 'iife',
    entryFileNames: '[name].js',
    sourcemap: false,
    generatedCode: {
      'preset': 'es5'
    }
    // generatedCode: {
    //   charset: 'utf8',
    // },
  },
  plugins: [
    alias({
      entries: [
        {
          find: 'buffer',
          replacement: path.resolve('node_modules/buffer/index.js'),
        },
      ],
    }),
    // nodePolyfills(),
    nodeResolve({
      browser: true,
      preferBuiltins: false,
      extensions: ['.js', '.ts', '.tsx'],
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: false,
    }),
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
    replace({
      preventAssignment: true,
      values: {
        'globalThis.version': JSON.stringify('0.1.14'),
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
    }),
  ],

}
)
