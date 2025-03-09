import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindConfig from './tailwind.config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js', // Point to your PostCSS config
  },
})
