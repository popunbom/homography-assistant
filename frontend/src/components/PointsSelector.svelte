<script lang="ts">
  import { onMount } from "svelte";
  import FileUploader from "./FileUploader.svelte";
  import ImageCanvas from "./ImageCanvas.svelte";
  import DraggableList from "./DraggableList.svelte";
  import type { Point } from "../entities/Point";

  // Props
  export let points: Point[];

  // Reactive data
  let image: HTMLImageElement;
  let imageCanvasDom: HTMLDivElement;
  let width: number;
  let height: number;

  onMount(() => {
    width = imageCanvasDom.clientWidth;
    height = imageCanvasDom.clientHeight;
  });
</script>

<div class="points-selector">
  <div class="image-canvas" bind:this={imageCanvasDom}>
    {#if image === undefined}
      <FileUploader on:imageLoad={({ detail }) => (image = detail)} />
    {:else}
      <ImageCanvas {width} {height} bind:points {image} />
    {/if}
  </div>
  <div class="draggable-list">
    <DraggableList bind:points />
  </div>
</div>

<style lang="scss">
  .points-selector {
    border: 2px solid gray;
    width: 100%;
    height: 100%;
    display: flex;
  }

  .image-canvas {
    width: 70%;
    height: 100%;
  }
  .draggable-list {
    width: 30%;
    border: 2px solid gray;
    margin: -2px -2px;
  }
</style>
