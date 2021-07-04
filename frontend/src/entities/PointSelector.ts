import type { Point } from "./Point";

export interface PointSelector {
  image: HTMLImageElement;
  points: Point[];
}

export const newPointSelector = (): PointSelector => {
  const pointSelector = {} as PointSelector;
  pointSelector.points = [] as Point[];
  return pointSelector;
};
