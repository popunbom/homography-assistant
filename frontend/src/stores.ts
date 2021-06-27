import { writable } from "svelte/store";
import type { Point } from "./entities/Point";

export const pointsA = writable([] as Point[]);
export const pointsB = writable([] as Point[]);
