import {writable} from "svelte/store";

export const Lang = writable<Formal.Lang>("en");
export const DeviceInfo = writable<Core.DeviceInfo | null>(null);

// CLI
export const Cleared = writable<boolean>(false);
export const CurrentPath = writable<string[]>(["~"]);
export const PreviousCommands = writable<CLI.HistoryElement[]>([]);
export const InputHistoryStack = writable<string[]>([]);
