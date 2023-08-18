import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents() {
      // node event listeners go here
    },
    // the webpack dev server (npm run start:dev) serves the app on 3003
    baseUrl: 'http://localhost:3003/',
  },
  env: {
    mode: 'development',
    PORT: 3003,
    // the json-server mock API runs on 8003 (npm run start:dev:server)
    apiUrl: 'http://localhost:8003/',
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
})
