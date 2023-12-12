import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
    // react({jsxImportSource: "emotion/react", babel: {plugins: ["@emotion/babel-plugin"],},}),],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3009', 
        changeOrigin: true, 
        rewrite: (path) => path.replace(/^\/api/ , '')
      }, 
    }, 
  },
})
