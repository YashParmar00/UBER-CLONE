import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: ['uber-clone-1-4vn5.onrender.com', 'localhost'], // Add your Render host here
  },
})
