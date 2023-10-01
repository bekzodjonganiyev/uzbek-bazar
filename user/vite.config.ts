import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    origin: 'https://uzb.technostudio.uz/api/v1/web',
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
