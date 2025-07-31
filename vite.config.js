// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Kolybria/', // 🚨 Критически важно для GitHub Pages! 
  plugins: [vue()],
  plugins: [react()],
  server: {
    port: 3000
  }
})