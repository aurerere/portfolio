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
      '@stores': path.resolve('src/lib/stores/'),
      '@views': path.resolve('src/views/')
    }
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: (assetFileInfo) => {
          return "assets/" + assetFileInfo.name;
        },
        entryFileNames: (entryFileInfo) => {
          return "assets/" + entryFileInfo.name + ".js";
        },
        chunkFileNames: (chunkFileInfo) => {
          return "assets/" + chunkFileInfo.name + ".js";
        }
      }
    }
  },
});
