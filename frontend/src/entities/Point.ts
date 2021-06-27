import Konva from "konva";
import { Color, pickColor } from "../utils/colors";

const baseConfig = {
  circle: {
    scale: { x: 1, y: 1 },
    radius: 12,
    strokeWidth: 3,
  } as Konva.CircleConfig,
  text: {
    fontSize: 15,
  } as Konva.TextConfig,
};

export interface Point {
  kGroup: Konva.Group;
  pointNumber: number;
  color: Color;
}

export function getPos(point: Point): Konva.Vector2d {
  return point.kGroup.getPosition();
}

export function newPoint(
  pointNumber: number,
  stageScale: Konva.Vector2d,
  pos: Konva.Vector2d,
  onChangeHandler: () => void,
): Point {
  const kGroup = new Konva.Group({
    draggable: true,
    scale: { x: 1 / stageScale.x, y: 1 / stageScale.y },
    ...pos,
  });

  const text = `${pointNumber}`;
  const color = pickColor(pointNumber);
  const circleRadius = baseConfig.circle.radius || 12;

  kGroup.add(
    // Circle
    new Konva.Circle({
      ...baseConfig.circle,
      radius: circleRadius,
      fill: color.bg,
      stroke: color.fg,
    }),
    // Text
    new Konva.Text({
      ...baseConfig.text,
      text,
      fill: color.fg,
      align: "center",
      width: circleRadius,
      height: circleRadius,
      x: -(circleRadius / 2),
      y: -(circleRadius / 2),
    }),
  );

  kGroup.on("dragend", onChangeHandler);

  return { kGroup, pointNumber, color };
}
