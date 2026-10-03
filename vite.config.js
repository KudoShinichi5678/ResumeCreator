import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = parseInt(env.PORT || env.VITE_PORT || '5173', 10)
  const previewPort = parseInt(env.PREVIEW_PORT || env.VITE_PREVIEW_PORT || '4173', 10)

  return {
    plugins: [react()],
    server: {
      port: Number.isNaN(port) ? 5173 : port,
    },
    preview: {
      port: Number.isNaN(previewPort) ? 4173 : previewPort,
    },
  }
})
