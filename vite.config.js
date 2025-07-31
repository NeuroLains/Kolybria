// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Kolybria/', // 🚨 Критически важно для GitHub Pages! 
  plugins: [react()],
  server: {
    port: 3000
  }
})