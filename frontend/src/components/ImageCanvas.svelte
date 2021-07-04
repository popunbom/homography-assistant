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
  export let data: PointSelector;

  // Reactive data
  let stage: Konva.Stage;
  let layer: Konva.Layer;
  let stageParentDom: HTMLDivElement | undefined;

  $: scalableStageConfig = calcStageConfig(
    stageParentDom?.clientWidth,
    stageParentDom?.clientHeight,
    data.image,
  );
  $: stageScale = scalableStageConfig.scale;

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

<div class="fill-width fill-height" bind:this={stageParentDom}>
  <ScalableStage bind:stage bind:layer {childs} config={scalableStageConfig} />
</div>

<style lang="scss">
  @import "../stylesheets/common";
</style>
