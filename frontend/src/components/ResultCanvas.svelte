<script lang="ts">
  import type Konva from "konva";

  import { calcStageConfig } from "../utils/configs";
  import { newImage } from "../entities/Image";
  import type { LayerChildType } from "./canvas/ScalableStage.svelte";

  import ScalableStage from "./canvas/ScalableStage.svelte";

  // Props
  export let baseImage: HTMLImageElement;
  export let overImage: HTMLImageElement;

  // Fixed data

  // Reactive data
  let stage: Konva.Stage;
  let layer: Konva.Layer;
  let children: LayerChildType[] = [];
  let opacity: number = 0.5;
  let visibleOverImage: boolean = true;
  let stageParentDom: HTMLDivElement | undefined;

  // Computed values
  $: disabled = baseImage === undefined || overImage === undefined;
  $: kBaseImage = newImage({ image: baseImage, opacity: 1 });
  $: kOverImage = newImage({
    image: overImage,
    opacity: 1,
    visible: visibleOverImage,
  });
  $: children = [kOverImage, kBaseImage];
  $: scalableStageConfig = calcStageConfig(
    stageParentDom?.clientWidth,
    stageParentDom?.clientHeight,
    baseImage,
  );

  const handleOpacityChange = (newValue: number) => {
    kBaseImage.opacity(newValue);
  };
  const handleToggleVisible = (newVisibleOverImage: boolean) => {
    kOverImage.visible(newVisibleOverImage);
    visibleOverImage = newVisibleOverImage;
  };
</script>

<div class="result-canvas">
  <div class="toolbar">
    <label for="opacity">Opacity</label>
    <input
      type="range"
      name="opacity"
      id="opacity"
      min="0"
      max="1"
      step="0.01"
      {disabled}
      bind:value={opacity}
      on:change={({ currentTarget }) =>
        handleOpacityChange(currentTarget.valueAsNumber)}
    />
    <button {disabled} on:click={() => handleToggleVisible(!visibleOverImage)}
      >{visibleOverImage ? "hidden" : "visible"}</button
    >
  </div>
  <div class="scalable-stage" bind:this={stageParentDom}>
    <ScalableStage
      bind:stage
      bind:layer
      childs={children}
      config={scalableStageConfig}
    />
  </div>
</div>

<style lang="scss">
  @import "../stylesheets/common";

  .result-canvas {
    height: 100%;
  }

  .toolbar {
    @extend .flex__center_vertical;
    height: 5%;
    & > * {
      margin-right: 1em;
    }
  }
  .scalable-stage {
    border: 2px solid gray;
    height: 95%;
  }
</style>
