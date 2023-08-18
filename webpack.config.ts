import webpack from 'webpack'
import path from 'path'
import { buildWebpackConfig } from './config/build/buildWebpackConfig'
import { BuildEnv, BuildMode, BuildPaths } from './config/build/types/config'

function getApiUrl(mode: BuildMode, apiUrl?: string) {
  // override at build time: `webpack --env apiUrl=https://...`
  if (apiUrl) {
    return apiUrl
  }
  if (mode === 'production') {
    // set your production API url here, or pass --env apiUrl=...
    return 'https://api.react-adv.example'
  }
  return 'http://localhost:8003'
}

export default (env: BuildEnv) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    locales: path.resolve(__dirname, 'public', 'locales'),
    buildLocales: path.resolve(__dirname, 'build', 'locales'),
  }

  const mode = env?.mode || 'development'
  // `--env port=` wins (npm start), then a host-assigned PORT (preview tools
  // that pick a free port), then the default.
  const PORT = env?.port || Number(process.env.PORT) || 3003
  const apiUrl = getApiUrl(mode, env?.apiUrl)
  const isDev = mode === 'development'

  const config: webpack.Configuration = buildWebpackConfig({
    mode,
    paths,
    isDev,
    port: PORT,
    apiUrl,
    project: 'frontend',
  })

  return config
}
