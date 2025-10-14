import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";

// const isDev = process.env.NODE_ENV === "development";
const isDev = process.env.NODE_ENV === "development";
const outputDir = process.env.MPV_SCRIPT_DIR ?? "rspack"

console.log(outputDir)
export default defineConfig({
  target: ['es3', 'web'],
  entry: {
    "main": "./src/index.tsx"
  },
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"]
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   include: [/node_modules/],
      //   // exclude: [/node_modules/],
      //   loader: 'builtin:swc-loader',
      //   options: {
      //     jsc: {
      //       parser: {
      //         syntax: 'ecmascript',
      //       },
      //     },
      //   },
      //   type: 'javascript/auto',
      // },
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true
                },
                // transform: {
                //   react: {
                //     runtime: "automatic",
                //     development: isDev,
                //     refresh: isDev
                //   }
                // }
              },
            }
          }
        ]
      },
      {
        test: /\.(?:js|mjs|cjs)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env',]
            ]
          }
        }
      },
    ]
  },
  output: {
    path: outputDir,
    charset: false,
    chunkFormat: "commonjs"
  },
  // optimization
  optimization: {
    minimize: false,
    minimizer: [
      new rspack.SwcJsMinimizerRspackPlugin({
        minimizerOptions: {
          format: {
            asciiOnly: false,
          },
        },
      })
    ]
  },
});
