import {writable} from "svelte/store";

export const Lang = writable<Formal.Lang>("en");

// CLI
export const Cleared = writable<boolean>(false);
export const History = writable<CLI.HistoryElement[]>([]);
export const Path = writable<CLI.Path>([]);
