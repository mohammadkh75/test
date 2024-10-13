import { defineConfig } from 'vite'
import tailwindcss from 'tailwindcss'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
})
