import path from 'path';
import { Configuration } from 'webpack';
import { BuildEnv, BuildMode, BuildPaths } from './config/build/types/config';
import buildWebpackConfig from './config/build/buildWebpackConfig';

export default (env: BuildEnv): Configuration => {
  const mode: BuildMode = env.mode || 'development';
  const port: number = env.port || 3000;
  const isDev: boolean = mode === 'development';
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src/index.tsx'),
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public/index.html'),
    src: path.resolve(__dirname, 'src'),
  };

  return buildWebpackConfig({
    mode,
    paths,
    port,
    isDev,
  });
};
