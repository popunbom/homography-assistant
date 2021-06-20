import Konva from "konva";
import type { Color } from "../../utils/colors";

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

export interface PointConfig {
  id: number
  color: Color
  pos: Konva.Vector2d
}

export interface PointClassConfig extends PointConfig {
  index: number
  scale: number
  onPointDrag: (index: number, pos: Konva.Vector2d) => void
}


export class Point extends Konva.Group {
  private config: PointClassConfig;
  private circle: Konva.Circle;
  private text: Konva.Text;

  constructor(config: PointClassConfig) {
    super({
      draggable: true,
      ...config.pos,
    });
    this.config = config;

    const text = `${this.config.index}`;
    const circleConfig: Konva.CircleConfig = {
      ...baseConfig.circle,
      radius: baseConfig.circle.radius * this.config.scale,
      strokeWidth: baseConfig.circle.strokeWidth * this.config.scale,
      fill: this.config.color.bg,
      stroke: this.config.color.fg,
    };
    this.circle = new Konva.Circle(circleConfig);
    this.add(this.circle);

    const textConfig: Konva.TextConfig = {
      text,
      fill: this.config.color.fg,
      fontSize: baseConfig.text.fontSize * this.config.scale,
      x: -(circleConfig.radius * text.length * 0.4),
      y: -(circleConfig.radius * 0.5),
    };
    this.text = new Konva.Text(textConfig);
    this.add(this.text);

    this.on("dragend", (event) => {
      const position = event.currentTarget.position();
      console.debug(`DragPoint <config=${JSON.stringify(this.config)}>`)
      this.config.onPointDrag(this.config.index, this.config.pos);
    })
  }
}
