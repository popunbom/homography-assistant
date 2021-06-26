import { writable, derived } from "svelte/store";
import { pickColorWithBG } from "../utils/colors";
import type { PointConfig } from "../components/canvas/Point";
import type Konva from "konva";

export const points = writable([] as Konva.Vector2d[]);

export const pointConfigs = derived(
  points,
  $points => $points.map(
    (value, index) => ({
      id: index,
      color: pickColorWithBG(index),
      pos: value
    } as PointConfig)
  )
)
