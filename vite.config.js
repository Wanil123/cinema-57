import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // GitHub Pages uses a subdirectory; Netlify serves the preview at its domain root.
  base: process.env.VITE_PORTFOLIO_PREVIEW === 'true' ? '/' : '/cinema-57/',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:3005'
    }
  }
})
