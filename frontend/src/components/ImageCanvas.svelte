<script lang="ts">
  import type Konva from "konva";

  import { calcStageConfig } from "../utils/configs";
  import { newPoint } from "../entities/Point";
  import { newImage } from "../entities/Image";
  import type { PointSelector } from "../entities/PointSelector";
  import type { ScalableStageConfig } from "../utils/configs";
  import type { LayerChildType } from "./canvas/ScalableStage.svelte";

  import ScalableStage from "./canvas/ScalableStage.svelte";

  // Props
  export let width: number;
  export let height: number;
  export let data: PointSelector;

  // Fixed data
  const scalableStageConfig: ScalableStageConfig = calcStageConfig(
    width,
    height,
    data.image,
  );

  // Reactive data
  let stage: Konva.Stage;
  let layer: Konva.Layer;
  let stageScale: Konva.Vector2d = scalableStageConfig.scale;

  // Event handlers
  const handleAddPoint = (pos: Konva.Vector2d) => {
    const point = newPoint(
      data.points.length + 1,
      stageScale,
      pos,
      // Svelte では、代入が更新検知になっているため
      () => (data.points = [...data.points]),
    );
    data.points = [...data.points, point];
  };

  // Computed values
  $: childs = [
    newImage({
      image: data.image,
      onClickHandler: (cursorPos) => handleAddPoint(cursorPos),
    }),
    ...data.points,
  ] as LayerChildType[];
</script>

<div class="image-canvas">
  <ScalableStage bind:stage bind:layer {childs} config={scalableStageConfig} />
</div>
