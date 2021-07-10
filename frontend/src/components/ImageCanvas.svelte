<script lang="ts">
  import type Konva from "konva";

  import { calcStageConfig } from "../utils/configs";
  import { newPoint } from "../entities/Point";
  import { newImage } from "../entities/Image";
  import type { ScalableStageConfig } from "../utils/configs";
  import type { PointSelector } from "../entities/PointSelector";
  import type { LayerChildType } from "./canvas/ScalableStage.svelte";

  import ScalableStage from "./canvas/ScalableStage.svelte";

  // Props
  export let data: PointSelector;

  // Reactive data
  let stage: Konva.Stage;
  let layer: Konva.Layer;
  let stageParentDom: HTMLDivElement | undefined;
  let scalableStageConfig: ScalableStageConfig = calcStageConfig(
    stageParentDom?.clientWidth,
    stageParentDom?.clientHeight,
    data.image,
  );
  let children: LayerChildType[] = [];

  // Computed values
  $: {
    console.log("Update@ImageCanvas: scalableStageConfig");
    scalableStageConfig = calcStageConfig(
      stageParentDom?.clientWidth,
      stageParentDom?.clientHeight,
      // TODO: data.points の更新で、ここが発火 → position が初期化されることでズレる
      data.image,
    );
  }
  $: stageScale = scalableStageConfig.scale;
  $: {
    console.log("Update@ImageCanvas: children");
    children = [
      newImage({
        image: data.image,
        onClickHandler: (cursorPos) => handleAddPoint(cursorPos),
      }),
      ...data.points,
    ];
  }

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
</script>

<div class="fill-width fill-height" bind:this={stageParentDom}>
  <ScalableStage
    bind:stage
    bind:layer
    childs={children}
    config={scalableStageConfig}
  />
</div>

<style lang="scss">
  @import "../stylesheets/common";
</style>
