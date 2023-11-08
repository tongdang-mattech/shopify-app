import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
function useAnonymous() {
  return {
    name: 'anonymous',
    transformIndexHtml(html) {
      return html.replace('crossorigin', 'crossorigin="anonymous"')
    }
  }
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), svgLoader(), useAnonymous()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3333',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
