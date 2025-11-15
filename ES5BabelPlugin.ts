import type { Plugin } from 'esbuild'
import * as babel from '@babel/core'
import * as fs from 'node:fs'
import * as path from 'node:path'

/**
 * Options for ES5BabelPlugin
 */
export interface ES5BabelPluginOptions {
  /**
   * Custom path to babel config file
   * @default 'babel.config.json'
   */
  configFile?: string

  /**
   * Filter for files to transform
   * @default /\.(js|jsx|ts|tsx)$/
   */
  filter?: RegExp
}

/**
 * Load and parse Babel configuration from file
 */
function loadBabelConfig(configPath: string): babel.TransformOptions | null {
  try {
    const absolutePath = path.resolve(process.cwd(), configPath)

    if (!fs.existsSync(absolutePath)) {
      console.warn(`[ES5BabelPlugin] Babel config file not found: ${configPath}`)
      return null
    }

    const configContent = fs.readFileSync(absolutePath, 'utf-8')
    const config = JSON.parse(configContent)

    return config
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error(`[ES5BabelPlugin] Invalid JSON in babel config: ${configPath}`)
    } else {
      console.error(`[ES5BabelPlugin] Error reading babel config:`, error)
    }
    return null
  }
}

/**
 * ESBuild plugin that transforms code to ES5 using Babel
 * Reads configuration from babel.config.json
 *
 * @example
 * ```typescript
 * import { ES5BabelPlugin } from './ES5BabelPlugin'
 *
 * build({
 *   plugins: [
 *     ES5BabelPlugin()
 *   ]
 * })
 * ```
 */
export function ES5BabelPlugin(options?: ES5BabelPluginOptions): Plugin {
  const configFile = options?.configFile || 'babel.config.json'
  const filter = options?.filter || /\.(js|jsx|ts|tsx)$/

  return {
    name: 'es5-babel-plugin',
    setup(build) {
      // Load Babel configuration once during setup
      const babelConfig = loadBabelConfig(configFile)
      if (!babelConfig) {
        console.warn('[ES5BabelPlugin] No valid Babel config found, plugin will not transform files')
        return
      }

      // Register onLoad hook for file transformation
      build.onLoad({ filter }, async (args) => {
        try {
          // Skip node_modules
          // if (args.path.includes('node_modules')) {
          //   return null
          // }

          // Read file contents
          const source = await fs.promises.readFile(args.path, 'utf-8')

          // Transform code using Babel
          const result = await babel.transformAsync(source, {
            ...babelConfig,
            filename: args.path,
            sourceMaps: false
          })

          if (!result || !result.code) {
            return null
          }

          // Return transformed code
          return {
            contents: result.code,
            loader: 'js'
          }
        } catch (error: any) {
          // Handle Babel transformation errors
          const errorMessage = error.message || 'Unknown error during Babel transformation'
          const errorLocation = error.loc ? {
            file: args.path,
            line: error.loc.line,
            column: error.loc.column
          } : {
            file: args.path
          }

          console.error(`[ES5BabelPlugin] Error transforming ${args.path}:`, errorMessage)

          return {
            errors: [{
              text: errorMessage,
              location: errorLocation
            }]
          }
        }
      })
    }
  }
}
