import path from 'path';
import {Configuration} from "webpack";
import buildWebpackConfig from "./config/build/buildWebpackConfig";
import {BuildEnv, BuildMode, BuildPaths} from "./config/build/types/config";

const webpackConfig = (env: BuildEnv): Configuration => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html')
  };

  const mode: BuildMode = env.mode || 'development';
  const PORT: number = env.port || 3000;

  const isDev: boolean = mode === 'development';

  return buildWebpackConfig({
    mode,
    paths,
    port: PORT,
    isDev,
  });
}

export default webpackConfig;
