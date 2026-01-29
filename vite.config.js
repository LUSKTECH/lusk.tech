import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { codecovRollupPlugin } from '@codecov/rollup-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      plugins: [
        codecovRollupPlugin({
          enableBundleAnalysis: process.env.CODECOV_TOKEN !== undefined,
          bundleName: 'lusk-tech',
          uploadToken: process.env.CODECOV_TOKEN,
        }),
      ],
    },
  },
})
