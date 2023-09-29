import {writable} from "svelte/store";

export const Lang = writable<Formal.Lang>("en");
export const DeviceInfo = writable<Core.DeviceInfo | null>(null);

// CLI
export const Cleared = writable<boolean>(false);
export const History = writable<CLI.HistoryElement[]>([]);
export const CurrentPath = writable<string[]>(["~"]);
export const InputHistoryStack = writable<string[]>([]);
