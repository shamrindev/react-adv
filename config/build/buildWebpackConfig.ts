import { Configuration } from "webpack";
import { BuildOptions } from "./types/config";
import buildLoaders from "./buildLoaders";
import buildResolves from "./buildResolves";
import buildPlugins from "./buildPlugins";
import buildDevServer from "./buildDevServer";

function buildWebpackConfig(options: BuildOptions): Configuration {
  const { mode, paths, isDev } = options;

  return {
    mode,
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    module: {
      rules: buildLoaders(options)
    },
    resolve: buildResolves(options),
    plugins: buildPlugins(options),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  }
}

export default buildWebpackConfig;
