import {ResolveOptions} from "webpack";
import {BuildOptions} from "./types/config";

function buildResolves(options: BuildOptions): ResolveOptions {
  const { paths } = options;

  return {
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true,
    modules: [paths.src, 'node_modules'],
    mainFiles: ['index'],
    alias: {}
  }
}

export default buildResolves;
