import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@cli': path.resolve('src/lib/cli/'),
      '@core-components': path.resolve('src/lib/components/'),
      '@utils': path.resolve('src/lib/utils/'),
      '@stores': path.resolve('src/stores/index')
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          return "assets/" + assetInfo.name;
        },
        entryFileNames: 'assets/index.js',
      }
    }
  }
})
