import { writable } from 'svelte/store';

export const Lang = writable<"fr" | "en">("en");
