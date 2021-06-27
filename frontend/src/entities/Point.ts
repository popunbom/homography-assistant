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
}

export class Point extends Konva.Group {
  private kCircle: Konva.Circle;
  private kText: Konva.Text;
  public pointNumber: number;

  constructor(pointNumber: number, stageScale: Konva.Vector2d, pos: Konva.Vector2d, onChangeHandler: () => void) {
    super({
      draggable: true,
      scale: { x: 1 / stageScale.x, y: 1 / stageScale.y },
      ...pos,
    });

    this.pointNumber = pointNumber;

    const text = `${this.pointNumber}`;
    const color = pickColor(this.pointNumber);
    const circleRadius = baseConfig.circle.radius;

    // Circle
    this.kCircle = new Konva.Circle({
      ...baseConfig.circle,
      radius: circleRadius,
      fill: color.bg,
      stroke: color.fg,
    });
    this.add(this.kCircle);

    // Text
    this.kText = new Konva.Text({
      text,
      fill: color.fg,
      x: -(circleRadius * text.length * 0.4),
      y: -(circleRadius * 0.5),
    });
    this.add(this.kText);

    this.on("dragend", ({ currentTarget }) => {
      const newPos = currentTarget.position();
      this.setPosition(newPos);
      onChangeHandler();
    });
  }
  public toString(): string {
    return `Point <pointNumber=${this.pointNumber}, pos=${JSON.stringify(this.pos)}, scale=${JSON.stringify(this.scale())}, color=${JSON.stringify(this.color)}>`;
  }
  get pos(): Konva.Vector2d {
    return this.getPosition()
  }
  get color(): Color {
    return {
      fg: this.kCircle.stroke(),
      bg: this.kCircle.fill(),
    }
  }
}
