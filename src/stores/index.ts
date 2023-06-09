import { writable } from 'svelte/store';

export const lang = writable<"fr" | "en">("en");
