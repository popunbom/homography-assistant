<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Konva from "konva";

  import ScalableStage from "./canvas/ScalableStage.svelte";

  import { Point } from "./canvas/Point";
  import { calcStageConfig } from "../utils/configs";
  import type { PointConfig } from "./canvas/Point";
  import type { ScalableStageConfig } from "../utils/configs";
  import type { LayerChildType } from "./canvas/ScalableStage.svelte";

  const cursorPosInImage = (): Konva.Vector2d => {
    console.debug(`cursorPos: ${JSON.stringify(stage.getPointerPosition())}`);

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
  };

  // Props
  export let width: number;
  export let height: number;
  export let image: HTMLImageElement;
  export let points: PointConfig[];

  // Fixed Data
  const dispatch = createEventDispatcher();
  const scalableStageConfig: ScalableStageConfig = calcStageConfig(
    width,
    height,
    image,
  );
  console.debug(scalableStageConfig);

  // Reactive Data
  let isCursorOnImage: boolean = false;
  let stage: Konva.Stage;
  let layer: Konva.Layer;
  let pointScale: number = 1.0;

  const childs: LayerChildType[] = [
    // Image Layer
    (() => {
      const kImage = new Konva.Image({ image });
      kImage.on("mouseenter", () => (isCursorOnImage = true));
      kImage.on("mouseleave", () => (isCursorOnImage = false));
      kImage.on("click", () => {
        const cursorPos = cursorPosInImage();
        console.debug(
          `onImageClick@ImageCanvas <cursorPos=${JSON.stringify(cursorPos)}>`,
        );
        dispatch("add-point", cursorPos);
      });
      return kImage;
    }).bind(this)(),
    // Points Layer
    ...points.map((point, i) => {
      return new Point({
        ...point,
        index: i,
        scale: 1 / pointScale,
        onPointDrag: (index, pos) => {
          console.debug(
            `onPointDrag@ImageCanvas <index=${index}, pos=${JSON.stringify(
              pos,
            )}>`,
          );
          dispatch("drag-point", { index, pos });
        },
      });
    }),
  ];

  const handleScaleStage = (scale: Konva.Vector2d) => {
    pointScale = scale.x;
  };
</script>

<div class="image-canvas">
  <ScalableStage
    {stage}
    {layer}
    {childs}
    config={scalableStageConfig}
    on:scalling={(e) => handleScaleStage(e.detail)}
  />
</div>
