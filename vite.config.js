import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('framer-motion'))      return 'framer-motion'
          if (id.includes('lucide-react'))       return 'lucide'
          if (id.includes('@tanstack'))          return 'react-query'
          if (id.includes('react-router'))       return 'react-router'
          if (id.includes('react-helmet-async')) return 'helmet'
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'react-core'
        },
      },
    },
  },
})
