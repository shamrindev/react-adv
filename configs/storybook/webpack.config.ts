import webpack, { RuleSetRule } from 'webpack';
import path from 'path';
import { buildStylesLoader } from '../build/loaders/buildStylesLoader';
import { BuildPaths } from '../build/types/config';

export default ({ config }: {config: webpack.Configuration}) => {
  const paths: BuildPaths = {
    entry: '',
    output: '',
    html: '',
    src: path.resolve(__dirname, '..', '..', 'src'),
  };

  config.resolve!.modules!.push(paths.src);

  // eslint-disable-next-line no-param-reassign
  config.resolve!.alias = {
    '@': paths.src,
  };

  config.resolve!.extensions!.push('.ts', '.tsx');

  // eslint-disable-next-line
  config.module!.rules = config.module!.rules!.map(
    // @ts-ignore
    (rule: RuleSetRule) => {
      if (/svg/.test(rule.test as string)) {
        return { ...rule, exclude: /\.svg$/i };
      }

      return rule;
    },
  );

  config.module!.rules.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });
  config.module!.rules.push(buildStylesLoader(true));

  return config;
};
