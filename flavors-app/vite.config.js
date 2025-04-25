import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias:{
      "@components": path.resolve(__dirname, "src/components"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@context": path.resolve(__dirname, "src/context"),
      "@global": path.resolve(__dirname, "src/global"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@sass": path.resolve(__dirname, "src/sass"),
      "@services": path.resolve(__dirname, "src/services"),
    }
  }
})
