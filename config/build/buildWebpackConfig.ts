import webpack from 'webpack'
import { buildDevServer } from './buildDevServer'
import { buildLoaders } from './buildLoaders'
import { buildPlugins } from './buildPlugins'
import { buildResolvers } from './buildResolvers'
import { BuildOptions } from './types/config'

export function buildWebpackConfig(
  options: BuildOptions
): webpack.Configuration {
  const { paths, mode, isDev } = options
  return {
    mode: mode,
    entry: paths.entry,
    output: {
      // content hashes are for production cache-busting only. In development
      // they cause `ChunkLoadError`: every rebuild/restart mints new hashes and
      // `clean: true` removes the old files, so a still-open tab whose HMR
      // socket dropped (server restart, sleep, network blip) requests a chunk
      // hash that no longer exists -> 404. Stable dev names always resolve.
      filename: isDev ? '[name].js' : '[name].[contenthash].js',
      chunkFilename: isDev ? '[name].js' : '[name].[contenthash].js',
      path: paths.build,
      clean: true,
      publicPath: '/',
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? 'eval-cheap-module-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}
