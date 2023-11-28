import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { CSSPreprocess } from './svelte-plugin-css-preprocess.js';
import path from 'path';


export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: [vitePreprocess(), CSSPreprocess()],
}
