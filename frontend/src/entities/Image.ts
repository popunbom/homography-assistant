import Konva from "konva";

type OnClickHandler = (cursorPos: Konva.Vector2d) => void;

export class Image extends Konva.Image {
  constructor(image: HTMLImageElement, onClickHandler: OnClickHandler) {
    super({ image });
    this.on("click", () => {
      const cursorPos = this.getCursorPos();
      onClickHandler(cursorPos);
    });
  }
  getCursorPos(): Konva.Vector2d {
    const stage = this.getStage();
    const layer = this.getLayer();


    const scale = {
      x: layer.scale().x / stage.scale().x,
      y: layer.scale().y / stage.scale().y,
    };

    const fixedLayerPos = {
      x:
        stage.position().x / stage.scale().x +
        layer.position().x / layer.scale().x,
      y:
        stage.position().y / stage.scale().y +
        layer.position().y / layer.scale().y,
    };

    return {
      x: stage.getPointerPosition().x * scale.x - fixedLayerPos.x,
      y: stage.getPointerPosition().y * scale.y - fixedLayerPos.y,
    };
  }
}
