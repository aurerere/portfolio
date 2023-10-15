import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';


export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  alias: {
    '@cli': path.resolve('src/lib/cli/'),
    '@components': path.resolve('src/lib/components/'),
    '@utils': path.resolve('src/lib/utils/'),
    '@stores': path.resolve('src/stores/index')
  }
}
