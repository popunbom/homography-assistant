import Konva from "konva";

export interface ImageConfig {
  image: HTMLImageElement;
  visible?: boolean;
  opacity?: number;
  onClickHandler?: (cursorPos: Konva.Vector2d) => void;
}

export function getCursorPos(node: Konva.Node): Konva.Vector2d {
  const stage = node.getStage();
  const layer = node.getLayer();

  if (stage === null || layer === null) {
    return { x: 1.0, y: 1.0 };
  }

  const pointerPos = stage.getPointerPosition();
  if (pointerPos === null) {
    return { x: 1.0, y: 1.0 };
  }

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
    x: pointerPos.x * scale.x - fixedLayerPos.x,
    y: pointerPos.y * scale.y - fixedLayerPos.y,
  };
}

export function newImage(conf: ImageConfig): Konva.Image {
  const kImage = new Konva.Image({ image: conf.image });

  if (conf.visible !== undefined) {
    kImage.visible(conf.visible);
  }
  if (conf.opacity !== undefined) {
    kImage.opacity(conf.opacity);
  }
  if (conf.onClickHandler !== undefined) {
    const onClickHandler = conf.onClickHandler;
    kImage.on("click", ({ currentTarget }) =>
      onClickHandler(getCursorPos(currentTarget)),
    );
  }

  return kImage;
}
