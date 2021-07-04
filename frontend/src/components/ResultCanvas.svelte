<script lang="ts">
  import { tick } from "svelte";
  import type Konva from "konva";

  import { calcStageConfig } from "../utils/configs";
  import { newImage } from "../entities/Image";
  import type { ScalableStageConfig } from "../utils/configs";
  import type { LayerChildType } from "./canvas/ScalableStage.svelte";

  import ScalableStage from "./canvas/ScalableStage.svelte";

  // Props
  export let width: number;
  export let height: number;
  export let baseImage: HTMLImageElement;
  export let overImage: HTMLImageElement;

  // Fixed data
  // let scalableStageConfig = calcStageConfig(width, height, baseImage);

  // Reactive data
  let stage: Konva.Stage;
  let layer: Konva.Layer;
  let childs: LayerChildType[] = [];
  let opacity: number = 0.5;
  let visibleOverImage: boolean = true;

  $: kBaseImage = newImage({
    image: baseImage,
    opacity: 1,
  });

  $: kOverImage = newImage({
    image: overImage,
    opacity: opacity,
    visible: visibleOverImage,
  });

  // Computed values
  $: childs = (() => {
    console.log("kBaseImage, kOverImage");
    console.debug(kBaseImage);
    console.debug(kOverImage);
    return [kBaseImage, kOverImage];
  })();
  $: disabled = baseImage === undefined || overImage === undefined;
  $: scalableStageConfig = (() => {
    console.log("re-calc stage config");
    return calcStageConfig(width, height, baseImage);
  })();

  const handleOpacityChange = (newValue: number) => {
    kOverImage.opacity(newValue);
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
  <div class="scalable-stage">
    <ScalableStage
      bind:stage
      bind:layer
      {childs}
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
