import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    open: true
  },
  // 去除console和debugger
  esbuild: {
    pure: ["console.log", "debugger"]
  },
  build: {
    chunkSizeWarningLimit: 1000, // 大于1000k才警告
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/js/[name].[hash].js',
        entryFileNames: 'assets/js/[name].[hash].js',
        assetFileNames: 'assets/[ext]/[name].[hash].[ext]'
      }
    }
  }
})
