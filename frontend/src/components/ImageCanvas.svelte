<script lang="ts">
  import type Konva from "konva";

  import { calcStageConfig } from "../utils/configs";
  import { newPoint } from "../entities/Point";
  import { newImage } from "../entities/Image";
  import type { Point } from "../entities/Point";
  import type { ScalableStageConfig } from "../utils/configs";
  import type { LayerChildType } from "./canvas/ScalableStage.svelte";

  import ScalableStage from "./canvas/ScalableStage.svelte";

  // Props
  export let width: number;
  export let height: number;
  export let image: HTMLImageElement;
  export let points: Point[];

  // Fixed data
  const scalableStageConfig: ScalableStageConfig = calcStageConfig(
    width,
    height,
    image,
  );

  // Reactive data
  let stage: Konva.Stage;
  let layer: Konva.Layer;
  let stageScale: Konva.Vector2d = scalableStageConfig.scale;

  // Event handlers
  const handleAddPoint = (pos: Konva.Vector2d) => {
    const point = newPoint(
      points.length + 1,
      stageScale,
      pos,
      // Svelte では、代入が更新検知になっているため
      () => (points = [...points]),
    );
    points = [...points, point];
  };

  // Computed values
  $: childs = [
    newImage({
      image,
      onClickHandler: (cursorPos) => handleAddPoint(cursorPos),
    }),
    ...points,
  ] as LayerChildType[];
</script>

<div class="image-canvas">
  <ScalableStage bind:stage bind:layer {childs} config={scalableStageConfig} />
</div>
