<script lang="ts">
  import { onMount } from "svelte";
  import FileUploader from "./FileUploader.svelte";
  import ImageCanvas from "./ImageCanvas.svelte";
  import DraggableList from "./DraggableList.svelte";
  import type { Point } from "../entities/Point";

  // Props
  export let name: string;
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
  <h2>{name}</h2>
  <div class="flex-wrapper">
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
</div>

<style lang="scss">
  .points-selector,
  .image-canvas {
    height: 100%;
  }
  h2 {
    height: 10%;
    margin: 0;
    display: flex;
    align-items: center;
  }
  .flex-wrapper {
    border: 2px solid gray;
    width: 100%;
    height: 90%;
    display: flex;
  }

  .image-canvas {
    width: 70%;
  }
  .draggable-list {
    width: 30%;
    border: 2px solid gray;
    margin: -2px -2px;
  }
</style>
