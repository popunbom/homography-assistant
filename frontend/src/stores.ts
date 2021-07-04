import { Writable, writable } from "svelte/store";
import type { PointSelector } from "./entities/PointSelector";
import { newPointSelector } from "./entities/PointSelector";

export const basePointSelector: Writable<PointSelector> = writable(
  newPointSelector(),
);
export const overPointSelector: Writable<PointSelector> = writable(
  newPointSelector(),
);
