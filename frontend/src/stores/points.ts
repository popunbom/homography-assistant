import { writable } from "svelte/store";
import type { Point } from "../entities/Point";

export const points = writable([] as Point[]);
