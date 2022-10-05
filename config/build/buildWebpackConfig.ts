import {Configuration} from "webpack";
import {BuildOptions} from "./types/config";
import buildLoaders from "./buildLoaders";
import buildResolves from "./buildResolves";
import buildPlugins from "./buildPlugins";
import buildDevServer from "./buildDevServer";

function buildWebpackConfig(options: BuildOptions): Configuration {
  const {mode, paths, port, isDev} = options;

  return {
    mode,
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: '[name].[contenthash].js',
      clean: true,
    },
    module: {
      rules: buildLoaders(isDev)
    },
    resolve: buildResolves(paths),
    plugins: buildPlugins(paths),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(port) : undefined,
  }
}

export default buildWebpackConfig;
