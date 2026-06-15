import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load every var (no prefix filter) so we can reuse SERVER_PORT for the proxy.
  const env = loadEnv(mode, process.cwd(), '')
  const serverPort = env.SERVER_PORT || '3001'

  return {
    plugins: [react()],
    server: {
      // Forward API calls to the mail backend during development.
      proxy: {
        '/api': {
          target: `http://127.0.0.1:${serverPort}`,
          changeOrigin: true,
        },
      },
    },
  }
})
