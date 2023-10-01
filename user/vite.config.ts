import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from "path"

const ASSET_URL = process.env.ASSET_URL || '';

// https://vitejs.dev/config/
export default defineConfig({
  base: `${ASSET_URL}`,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
