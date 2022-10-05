import webpack, {WebpackPluginInstance} from "webpack";
import {BuildPaths} from "./types/config";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

function buildPlugins(paths: BuildPaths): WebpackPluginInstance[] {
  return [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: paths.html
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    })
  ]
}

export default buildPlugins;
