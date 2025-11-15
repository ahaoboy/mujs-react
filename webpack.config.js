const path = require('path');
const webpack = require('webpack');
const StatsWriterPlugin = require('./StatsWriterPlugin');

module.exports = {
  mode: 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'webpack'),
    filename: 'bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    ie: '11',
                  },
                  modules: false,
                },
              ],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'globalThis.version': JSON.stringify('0.1.15-alpha.17'),
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new StatsWriterPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new (require('terser-webpack-plugin'))({
        terserOptions: {
          ecma: 5,
          compress: {
            ecma: 5,
          },
          output: {
            ecma: 5,
            comments: false,
          },
        },
      }),
    ],
  },
  stats: {
    all: true,
    assets: true,
    modules: true,
    chunks: true,
    timings: true,
    builtAt: true,
    colors: true,
    errors: true,
    warnings: true,
  },
  performance: {
    hints: false,
  },
};
