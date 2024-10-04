import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: process.env.PORT || 4173, // Use the Render assigned port or default to 4173
    host: '0.0.0.0', // Bind to all network interfaces
  }
})
