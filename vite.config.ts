import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from "path";
import vitePluginJson from "./vite-plugin-json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vitePluginJson(), svelte()],
  resolve: {
    alias: {
      '@cli': path.resolve('src/lib/cli/'),
      '@core-components': path.resolve('src/lib/components/'),
      '@utils': path.resolve('src/lib/utils/'),
      '@stores': path.resolve('src/lib/stores/')
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
  },
});
