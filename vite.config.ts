import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/my': 'http://localhost:3000',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
    },
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly' /* module编译生效 */,
    },
  },
})
