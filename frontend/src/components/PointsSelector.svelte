<script lang="ts">
  import FileUploader from "./FileUploader.svelte";
  import ImageCanvas from "./ImageCanvas.svelte";
  import DraggableList from "./DraggableList.svelte";
  import type { Point } from "../entities/Point";

  // Props
  export let points: Point[];

  // Reactive data
  let image: HTMLImageElement;
</script>

<div class="points-selector">
  <div class="draggable-list">
    <DraggableList bind:points />
  </div>
  <div class="file-uploader">
    <FileUploader on:imageLoad={({ detail }) => (image = detail)} />
  </div>
  {#if image !== undefined}
    <div class="image-canvas">
      <ImageCanvas width={600} height={300} bind:points {image} />
    </div>
  {/if}
</div>

<style lang="scss">
  .file-uploader {
    width: 200px;
    height: 50px;
    margin: 16px;
  }

  .image-canvas {
    border: 1px solid cornflowerblue;
    width: fit-content;
    height: fit-content;
  }
  .draggable-list {
    position: absolute;
    right: 0px;
  }
</style>
