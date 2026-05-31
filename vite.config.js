import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    proxy: {
      // In dev mode: forward /api calls to the Express server on 3000
      '/api': 'http://localhost:3000',
    },
  },
})
