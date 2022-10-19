import { RuleSetRule } from 'webpack';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/config";

function buildLoaders(options: BuildOptions): RuleSetRule[] {
  const { isDev } = options

  const svgLoader: RuleSetRule = {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  }

  const fileLoader: RuleSetRule = {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  }

  const typescriptLoader: RuleSetRule = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  }

  const stylesLoader: RuleSetRule = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: {
            auto: /\.module/,
            localIdentName: isDev ? '[local]--[hash:base64:6]' : '[hash:base64:8]',
          }
        }
      },
      'sass-loader',
    ],
  }

  return [
    svgLoader,
    fileLoader,
    typescriptLoader,
    stylesLoader
  ]
}

export default buildLoaders;
