import webpack from 'webpack'
import { buildCssLoader } from './loaders/buildCssLoader'
import { BuildOptions } from './types/config'
import { buildBabelLoader } from './loaders/buildBabelLoader'

export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { isDev } = options
  const fileLoader = {
    test: /\.(png|jpe?g|gif|woff|woff2)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  }

  const svgLoader = {
    test: /\.svg$/,
    use: [
      {
        loader: '@svgr/webpack',
        options: {
          // SVGR runs SVGO with its default preset, which strips `viewBox`.
          // Without a viewBox, an icon rendered at any size other than its
          // intrinsic width/height gets clipped (e.g. the 18px search glass
          // collapsing to a half-disc). Keep the viewBox so icons scale
          // crisply to whatever width/height the <Icon> component requests.
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: { overrides: { removeViewBox: false } },
              },
            ],
          },
        },
      },
    ],
  }

  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false })
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true })

  const cssLoader = buildCssLoader(isDev)
  // without typescript you would need babel to transpile tsx
  // const typescriptLoader = {
  //   test: /\.tsx?$/,
  //   use: 'ts-loader',
  //   exclude: /node_modules/,
  // }

  return [
    fileLoader,
    svgLoader,
    // babelLoader, typescriptLoader,
    codeBabelLoader,
    tsxCodeBabelLoader,
    cssLoader,
  ]
}
