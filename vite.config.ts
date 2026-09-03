import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
// `base` is configurable so the app can be served either standalone at the
// domain root (default '/') or mounted under a sub-path — e.g. when it is
// bundled into the Poseidon platform at vtrainer.com/learn (VITE_BASE=/learn/).
// The app uses state-based navigation (no router), so base only affects the
// URLs of built assets and index.html.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
