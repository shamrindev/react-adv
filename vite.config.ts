import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
// https://vitejs.dev/config/

export default defineConfig(({ mode }) => ({
  plugins: [svgr({ exportAsDefault: true }), react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  define: {
    __IS_DEV__: JSON.stringify(mode === 'development'),
    // must match the json-server port (see the start:dev:server script)
    __API__: JSON.stringify('http://localhost:8003'),
    __PROJECT__: JSON.stringify('frontend'),
  },
}))
